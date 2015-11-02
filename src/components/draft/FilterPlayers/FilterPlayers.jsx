import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../PlayerTable';

import styles from './styles';

export default React.createClass({
  propTypes: {
  },
  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>

      </InlineCss>
    );
  }
});