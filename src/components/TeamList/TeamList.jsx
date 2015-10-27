import React from 'react';
import InlineCss from "react-inline-css";
import styles from './styles';

export default React.createClass({

  propTypes: {
    columns: React.PropTypes.object, 
    players: React.PropTypes.object
  },

  getTeamRows() {
    return 
  },

  getColumnOfType(type) {
    return this.props.columns.filter(column => column.type === type)[0];
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        {this.props.teams.map((team, index) => {
          return (
            <div key={index}>
              {team.name}
            </div>
          );
        })}
      </InlineCss>
    );
  }
});