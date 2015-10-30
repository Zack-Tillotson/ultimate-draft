import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  getPlayerId(player = {}) {
    const idColumn = this.props.columns.find(column => column.type === 'ID');
    return player[idColumn.name];  
  },

  getColumns() {
    return this.props.columns.map(column => column.name);
  },

  getHeaderRow() {
    return (
      <tr>
        {this.getColumns().map(column => (
          <td>{column}</td>
        ))}
      </tr>
    );
  },

  getBodyRows() {
    return this.props.players.map(player => player ? this.getBodyRow(player) : null);
  },

  getBodyRow(player) {
    return (
      <tr key={this.getPlayerId(player)}>
        {this.getColumns().map(column => (
          <td key={column}>{player[column]}</td>
        ))}
      </tr>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <table>
          <thead>
            {this.getHeaderRow()}
          </thead>
          <tbody>
            {this.getBodyRows()}
          </tbody>
        </table>
      </InlineCss>
    );
  }
});