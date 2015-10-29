import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired
  },

  modalClickHandler(name) {
    this.props.viewModal(name);
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
    const idColumn = this.getFilteredColumns().find(column => column.type === 'id');
    if(idColumn) {
      return player[idColumn];  
    } else {
      return Math.random();
    }
    
  },

  getPlayerColumns(player, index) {
    return (
      <tr key={this.getPlayerId(player)}>
        {this.getFilteredColumns().map(column => (
          <td key={column.name}>
            {player[column.name]}
          </td>
        ))}
      </tr>
    );
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

  getPlayers() {
    return this.props.players.map((player, index) => this.getPlayerColumns(player, index));
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="configs">
          {this.getColumnFilterModalLink()}
          {this.getRowFilterModalLink()}
        </div>
        <h5>{this.props.players.length} Players</h5>
        <table>
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