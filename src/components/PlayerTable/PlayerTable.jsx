import React from 'react';
import InlineCss from 'react-inline-css';
import utils from '../../draft/utils';
import styles from './styles';
import columnTypes from '../../columnTypes';
import {baggageId as baggageColumnType, team as teamColumnType} from '../../columnTypes';

export default React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    filterColumns: React.PropTypes.bool,
    filterRows: React.PropTypes.bool,
    rowFilters: React.PropTypes.object,
    playerClickHandler: React.PropTypes.func,
    includeBaggageSummary: React.PropTypes.bool,
    colors: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      filterColumns: false,
      filterRows: false,
      includeBaggageSummary: true,
      colors: false,
      labels: false,
    };
  },

  getInitialState() {
    const sorts = this.props.userData && this.props.userData.sorts || [];
    return {sorts}
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
        columns.splice(bagIdIndex, 1);
        columns = columns.concat(...this.getBaggageSummaryColumns(columns));
      }
    }

    return columns;

  },

  getBaggageSummaryColumns(columns) {
    return columns
      .filter(column => column.summary)
      .map((column, index, ary) => {
      return {...column, baggage: true, first: index == 0, last: index == ary.length - 1};
    });
  },

  sortColumnHandler(column) {
    const currentSortDir = this.getCurrentSort(column);
    const sortDir = !currentSortDir ? 1 : -1 * currentSortDir;
    const columnName = this.getColumns()[column].name;
    const sortPref = {sortDir, columnName};

    const newSorts = [sortPref].concat(this.state.sorts.filter(sortItem => sortItem.columnName != columnName));

    this.setState({sorts: newSorts});
    if(this.props.updateSortPreference) {
      this.props.updateSortPreference(newSorts);
    }
  },

  getCurrentSort(columnIndex) {
    const column = this.getColumns()[columnIndex];
    const existingSort = this.state.sorts.find(sortItem => sortItem.columnName == column.name);
    return !existingSort ? 0 : existingSort.sortDir;
  },

  getLatestSortColumn() {
    const latestSort = this.state.sorts.find(() => true);
    return !latestSort ? -1 : this.getColumns().findIndex(column => column.name == latestSort.columnName);
  },

  getHeaderRows() {
    
    const rows = [];
    const columns = this.getColumns();
    const latestSort = this.getLatestSortColumn()

    if(this.props.includeBaggageSummary) {
      const bagIdIndex = columns.findIndex(column => column.baggage);
      const baggageColumns = columns.filter(column => column.baggage);
      rows.push(
        <tr key="baggage">
          <td colSpan={bagIdIndex}></td>
          <td className="baggageColumn baggageHeader first last top" colSpan={baggageColumns.length}>Baggage</td>
        </tr>
      );
    }

    rows.push(
      <tr key="columnheaders">
        {columns.map((column, index) => {
          const isSortColumn = latestSort == index;
          const isSortAsc = this.getCurrentSort(latestSort) == 1;
          const columnClassName = isSortColumn ? (isSortAsc ? 'sortAsc' : 'sortDesc') : 'noSort';
          const baggageClassName = column.baggage ? 'baggageColumn' : 'playerColumn';
          const firstClassName = column.first ? 'first' : '';
          const lastClassName = column.last ? 'last' : '';
          return (
            <td 
              key={column.name + (column.baggage ? 'bag' : '')} 
              onClick={this.sortColumnHandler.bind(this, index)}
              className={['columnHead', columnClassName, baggageClassName, firstClassName, lastClassName].join(' ')}>
              <div className="tdContainer">{column.name}</div>
            </td>
          );
        })}
      </tr>
    );
    return rows;
  },

  // Also sorts
  getFilteredPlayers() {
    return this.props.players.filter(player => {
      if(!this.props.filterRows) {
        return true;
      } else {
        const otherTeam = !this.props.rowFilters.viewOtherTeam && (player.draftStatus.otherTeamsDraft || player.draftStatus.otherTeamsBaggage);
        const thisTeam = !this.props.rowFilters.viewYourTeam && player.draftStatus.currentTeamsDraft;
        const thisTeamBag = !this.props.rowFilters.viewYourBaggage && player.draftStatus.currentTeamsBaggage;
        const undraftableVector = !this.props.rowFilters.viewUndraftableVector && player.draftStatus.currentTeamUndraftable;
        const undraftableGender = !this.props.rowFilters.viewUndraftableGender && (player.draftStatus.maleOverdraft || player.draftStatus.femaleOverdraft);
        return !thisTeamBag && !otherTeam && !thisTeam && !undraftableVector && !undraftableGender;
      }
    })
    .sort(this.sortTwoPlayers);
  },

  sortTwoPlayers(a,b) {

    return this.state.sorts.reduce((soFar, sortItem) => {

      const column = this.getColumns().find(column => column.name == sortItem.columnName);

      if(!column) {
        return 0;
      }
      
      const sortFn = columnTypes.find(columnType => column.type == columnType.name).sort;      
      const result = sortItem.sortDir * sortFn(this.getValueOfColumnForPlayer(column, a), this.getValueOfColumnForPlayer(column, b));

      return !!soFar ? soFar : result;
    }, 0) || 0;
    
  },

  getBodyRows() {
    if(this.props.players.length === 0) {
      return (
        <tr key="nobody"><td colSpan={this.props.columns.length}>No players yet.</td></tr>
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
          const firstClassName = column.first ? 'first' : '';
          const lastClassName = column.last ? 'last' : '';
          return (
            <td 
              key={column.name + (column.baggage ? 'bag' : '')} 
              className={[baggageClassName, firstClassName, lastClassName].join(' ')}>
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
    } else if(column.name == teamColumnType.name) {
      return (
        <span className="status">
          {player.draftStatus.currentTeamsDraft && (
            <img src="/assets/filters/yourteam.png" height="10" width="10" />
          ) || player.draftStatus.currentTeamsBaggage && (
            <img src="/assets/filters/yourbags.png" height="10" width="10" />
          ) || (player.draftStatus.otherTeamsDraft || player.draftStatus.otherTeamsBaggage) && (
            <img src="/assets/filters/otherteam.png" height="10" width="10" />
          ) || player.draftStatus.currentTeamUndraftable && (
            <img src="/assets/filters/vectorillegal.png" height="10" width="10" />
          ) || (player.draftStatus.maleOverdraft || player.draftStatus.femaleOverdraft) && (
            <img src="/assets/filters/genderillegal.png" height="10" width="10" />
          )}
        </span>
      );
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
      return 'undraftableVector';
    } else if(player.draftStatus.maleOverdraft || player.draftStatus.femaleOverdraft) {
      return 'undraftableGender';
    }
    return 'draftable';
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
      </InlineCss>
    );
  }
});