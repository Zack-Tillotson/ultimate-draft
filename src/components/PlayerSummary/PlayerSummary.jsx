import React from 'react';
import InlineCss from 'react-inline-css';
import utils from '../../draft/utils';
import styles from './styles';
import columnTypes from '../../columnTypes';
import {baggageId as baggageColumnType} from '../../columnTypes';

export default React.createClass({

  propTypes: {
    player: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  getColumns() {
    return this.props.columns.filter(column => column.summary);
  },

  getHeaderRow() {
    
    const columns = this.getColumns();

    return (
      <tr>
        {columns.map((column, index) => {
          return (
            <td 
              key={column.name} 
              className={'columnHead'}>
              {column.name}
            </td>
          );
        })}
      </tr>
    );
  },

  getBodyRow() {
    const player = this.props.player;
    return (
      <tr key={utils.getPlayerId(player, this.props.columns)} >
        {this.getColumns().map((column) => {
          return (
            <td key={column.name}>
              {player.data[column.name]}
            </td>
          );
        })}
      </tr>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <table className="players">
          <thead>
            {this.getHeaderRow()}
          </thead>
          <tbody>
            {this.getBodyRow()}
          </tbody>
        </table>
      </InlineCss>
    );
  }
});