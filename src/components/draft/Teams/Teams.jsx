import React from 'react';
import InlineCss from 'react-inline-css';
import TeamTable from '../../TeamTable';

import modalNames from '../../../draft/modalNames';
import styles from './styles';

export default React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <TeamTable teams={this.props.teams} columns={this.props.columns} />
      </InlineCss>
    );
  }
});