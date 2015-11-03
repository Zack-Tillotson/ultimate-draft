import React from 'react';
import InlineCss from 'react-inline-css';
import utils from '../../../draft/utils';
import styles from './styles';
import columnTypes from '../../../columnTypes';

export default React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    filterColumns: React.PropTypes.bool,
    filterRows: React.PropTypes.bool,
    rowFilters: React.PropTypes.object,
    playerClickHandler: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      filterColumns: false,
      filterRows: false
    };
  },

  getInitialState() {
    return {
      sort: '',
      sortDir: 1
    }
  },

  getColumns() {
    return this.props.filterColumns
      ? this.props.columns.filter(column => column.visible)
      : this.props.columns;
  },

  sortColumnHandler(column) {
    if(this.state.sort == column) {
      const sortDir = this.state.sortDir == 0 ? 1
        : this.state.sortDir == 1 ? -1
        : 0;
        const sort = sortDir === 0 ? '' : this.state.sort;
      this.setState({sort, sortDir});
    } else {
      this.setState({sort: column, sortDir: 1});
    }
  },

  getHeaderRow() {
    return (
      <tr>
        {this.getColumns().map(column => {
          const isSortColumn = column.name == this.state.sort;
          const isSortAsc = this.state.sortDir == 1;
          const columnClassName = isSortColumn ? (isSortAsc ? 'sortAsc' : 'sortDesc') : 'noSort';
          return (
            <td 
              key={column.name} 
              onClick={this.sortColumnHandler.bind(this, column.name)}
              className={'columnHead ' + columnClassName}>
              {column.name}
            </td>
          );
        })}
      </tr>
    );
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
    if(!this.state.sort) {
      return 0;
    }
    const type = this.props.columns.find(column => column.name == this.state.sort).type;
    const sort = columnTypes.find(column => column.name == type).sort;
    
    return this.state.sortDir * sort(a[this.state.sort],b[this.state.sort]);    
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
        {this.getColumns().map(column => (
          <td key={column.name}>{player[column.name]}</td>
        ))}
      </tr>
    );
  },

  getPlayerClassName(player) {
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
            {this.getHeaderRow()}
          </thead>
          <tbody>
            {this.getBodyRows()}
          </tbody>
        </table>
        {this.getColorDescriptions()}
      </InlineCss>
    );
  }
});