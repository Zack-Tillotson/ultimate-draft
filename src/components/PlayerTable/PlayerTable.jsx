import React from 'react';
import InlineCss from 'react-inline-css';
import utils from '../../draft/utils';
import styles from './styles';
import columnTypes from '../../columnTypes';
import {baggageId as baggageColumnType} from '../../columnTypes';

export default React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    filterColumns: React.PropTypes.bool,
    filterRows: React.PropTypes.bool,
    rowFilters: React.PropTypes.object,
    playerClickHandler: React.PropTypes.func,
    colors: React.PropTypes.bool,
    includeBaggageSummary: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      filterColumns: false,
      filterRows: false,
      colors: true,
      includeBaggageSummary: true
    };
  },

  getInitialState() {
    return {
      sort: -1,
      sortDir: 1
    }
  },

  getColumns() {
    const cols = this.props.filterColumns
      ? this.props.columns.filter(column => column.visible)
      : this.props.columns.slice(0);
    return this.addBaggageColumns(cols);
  },

  addBaggageColumns(columns) {

    if(this.props.includeBaggageSummary) {

      const bagIdIndex = columns.findIndex(column => column.type == baggageColumnType.name);
      if(bagIdIndex >= 0) {
        columns.splice(bagIdIndex, 1, ...this.getBaggageSummaryColumns(columns));
      }
    }

    return columns;

  },

  getBaggageSummaryColumns(columns) {
    return columns.filter(column => column.summary).map(column => {
      return {...column, baggage: true};
    })
  },

  sortColumnHandler(column) {
    if(this.state.sort == column) {
      const sortDir = this.state.sortDir == 0 ? 1
        : this.state.sortDir == 1 ? -1
        : 0;
        const sort = sortDir === 0 ? -1 : this.state.sort;
      this.setState({sort, sortDir});
    } else {
      this.setState({sort: column, sortDir: 1});
    }
  },

  getHeaderRows() {
    
    const rows = [];
    const columns = this.getColumns();

    if(this.props.includeBaggageSummary) {
      const bagIdIndex = columns.findIndex(column => column.baggage);
      const baggageColumns = columns.filter(column => column.baggage);
      rows.push(
        <tr>
          <td colSpan={bagIdIndex}></td>
          <td className="baggageColumn baggageHeader" colSpan={baggageColumns.length}>Baggage</td>
        </tr>
      );
    }

    rows.push(
      <tr>
        {columns.map((column, index) => {
          const isSortColumn = index == this.state.sort;
          const isSortAsc = this.state.sortDir == 1;
          const columnClassName = isSortColumn ? (isSortAsc ? 'sortAsc' : 'sortDesc') : 'noSort';
          const baggageClassName = column.baggage ? 'baggageColumn' : 'playerColumn';
          return (
            <td 
              key={column.name + (column.baggage ? 'bag' : '')} 
              onClick={this.sortColumnHandler.bind(this, index)}
              className={['columnHead', columnClassName, baggageClassName].join(' ')}>
              {column.name}
            </td>
          );
        })}
      </tr>
    );
    return rows;
  },

  getFilteredPlayers() {
    return this.props.players.filter(player => {
      if(!this.props.filterRows) {
        return true;
      } else {
        const otherTeam = !this.props.rowFilters.viewOtherTeam && (player.draftStatus.otherTeamsDraft || player.draftStatus.otherTeamsBaggage);
        const thisTeam = !this.props.rowFilters.viewYourTeam && player.draftStatus.currentTeamsDraft;
        const undraftable = !this.props.rowFilters.viewUndraftable && player.draftStatus.currentTeamUndraftable;
        return !otherTeam && !thisTeam && !undraftable;
      }
    })
    .sort(this.sortTwoPlayers);
  },

  sortTwoPlayers(a,b) {
    if(this.state.sort < 0) {
      return 0;
    }
    const column = this.getColumns()[this.state.sort];
    const type = this.getColumns()[this.state.sort].type;
    const sortFn = columnTypes.find(column => column.name == type).sort;
    
    return this.state.sortDir * sortFn(this.getValueOfColumnForPlayer(column, a), this.getValueOfColumnForPlayer(column, b));
  },

  getBodyRows() {
    if(this.props.players.length === 0) {
      return (
        <tr><td colSpan={this.props.columns.length}>No players yet.</td></tr>
      );
    }
    return this.getFilteredPlayers().map(player => player ? this.getBodyRow(player) : null);
  },

  playerClickHandler(playerId) {
    if(this.props.playerClickHandler) {
      this.props.playerClickHandler(playerId);
    }
  },

  getBodyRow(player) {
    const className = this.getPlayerClassName(player);
    return (
      <tr
        key={utils.getPlayerId(player, this.props.columns)} 
        className={className}
        onClick={this.playerClickHandler.bind(this, utils.getPlayerId(player, this.props.columns))}>
        {this.getColumns().map((column) => {
          const baggageClassName = column.baggage ? 'baggageColumn' : 'playerColumn';
          return (
            <td key={column.name + (column.baggage ? 'bag' : '')} className={baggageClassName}>
              {this.getValueOfColumnForPlayer(column, player)}
            </td>
          );
        })}
      </tr>
    );
  },

  getValueOfColumnForPlayer(column, player) {
    if(column.baggage) {
      const bagPlayer = player.baggage;
      return bagPlayer ? bagPlayer.data[column.name] : '';
    } else {
      return player.data[column.name]
    }
  },

  getPlayerClassName(player) {
    if(!this.props.colors) { 
      return '';
    }
    if(!player.draftStatus) {
      return 'draftable';
    }
    if(player.draftStatus.otherTeamsDraft || player.draftStatus.otherTeamsBaggage) {
      return 'otherTeam';
    } else if(player.draftStatus.currentTeamsDraft) {
      return 'drafted';
    } else if(player.draftStatus.currentTeamsBaggage) {
      return 'draftedBaggage';
    } else if(player.draftStatus.currentTeamUndraftable) {
      return 'undraftable';
    }
    return 'draftable';
  },

  getColorDescriptions() {
    if(this.props.players.length > 0) {
      return (
        <div className="tableColors">
          <h5>Legend</h5>
          <div className="tableColor otherTeam">Another team</div>
          <div className="tableColor drafted">Your team</div>
          <div className="tableColor draftedBaggage">Your team&#39;s undrafted baggage</div>
          <div className="tableColor undraftable">Currently undraftable*</div>
        </div>
      );
    } else {
      return null;
    }
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <table className="players">
          <thead>
            {this.getHeaderRows()}
          </thead>
          <tbody>
            {this.getBodyRows()}
          </tbody>
        </table>
        {this.props.colors && this.getColorDescriptions()}
      </InlineCss>
    );
  }
});