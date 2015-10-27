import React from 'react';
import InlineCss from "react-inline-css";
import styles from './styles';

export default React.createClass({

  propTypes: {
    columns: React.PropTypes.object, 
    players: React.PropTypes.object
  },

  getColumnHeaderRow() {
    return (
      <tr>
        {this.props.columns.map(column => (
          <td key={column.name}>{column.name}</td>
        ))}
      </tr>
    )
  },

  getPlayerRows() {
    return this.props.players.map(player => (
      <tr key={player[this.getColumnOfType('ID').name]}>
        {this.props.columns.map(column => <td key={column.name}>{player[column.name]}</td>)}
      </tr>
    ));
  },

  getColumnOfType(type) {
    return this.props.columns.filter(column => column.type === type)[0];
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <table>
          <thead>
            {this.getColumnHeaderRow()}
          </thead>
          <tbody>
            {this.getPlayerRows()}
          </tbody>
        </table>
      </InlineCss>
    );
  }
});