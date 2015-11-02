import React from 'react';
import InlineCss from 'react-inline-css';
import utils from '../../../draft/utils';
import styles from './styles';

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
      rowFilters: false
    };
  },

  getColumns() {
    if(this.props.filterColumns) {
      return this.props.columns.filter(column => column.visible);  
    } else {
      return this.props.columns;
    }
  },

  sortColumn(column) {

  },

  getHeaderRow() {
    return (
      <tr>
        {this.getColumns().map(column => (
          <td key={column.name} onClick={this.sortColumn.bind(this, column.name)}>
            {column.name}
          </td>
        ))}
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