import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({

  propTypes: {
    currentTeam: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    players: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired,
    drafts: React.PropTypes.array.isRequired
  },

  modalClickHandler(name, data = {}) {
    this.props.viewModal(name, data);
  },

  draftPlayerHandler(playerId) {
    const teamId = this.props.currentTeam;
    this.modalClickHandler(
      modalNames.draftPlayer, 
      {playerId, teamId}
    ); 
  },

  getFilteredColumns() {
    return this.props.columns.filter(column => column.visible);
  },

  getColumnFilterModalLink() {
    const name = modalNames.filterColumns;
    return (
      <span className="modalLink" onClick={this.modalClickHandler.bind(this, name)}>
        {name}
      </span>
    );
  },

  getRowFilterModalLink() {
    const name = modalNames.filterRows;
    return (
      <span className="modalLink" onClick={this.modalClickHandler.bind(this, name)}>
        {name}
      </span>
    );
  },

  getPlayerId(player) {
    const idColumn = this.props.columns.find(column => column.type === 'ID');
    return player[idColumn.name];  
  },

  sortColumn(column) {

  },

  getColumns() {
    return this.getFilteredColumns().map(column => (
      <td  key={column.name} onClick={this.sortColumn.bind(this, column.name)}>
        {column.name}
      </td>
    ));
  },



  getPlayer(player, index) {
    const className="";
    return (
      <tr 
          key={this.getPlayerId(player)} 
          onClick={this.draftPlayerHandler.bind(this, this.getPlayerId(player))}>
        {this.getFilteredColumns().map(column => (
          <td key={column.name} className={className}>
            {player[column.name]}
          </td>
        ))}
      </tr>
    );
  },

  getPlayers() {
    return this.props.players.map((player, index) => this.getPlayer(player, index));
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="configs">
          {this.getColumnFilterModalLink()}
          {this.getRowFilterModalLink()}
        </div>
        <table className="players">
          <thead>
            <tr>
              {this.getColumns()}
            </tr>
          </thead>
          <tbody>
            {this.getPlayers()}
          </tbody>
        </table>
      </InlineCss>
    );
  }
});