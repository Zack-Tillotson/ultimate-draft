import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({
  propTypes: {
    players: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        {this.props.players.length} Players!
      </InlineCss>
    );
  }
});