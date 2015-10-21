import React from 'react';
import InlineCss from "react-inline-css";

import styles from './styles.raw.less';

import Wizard from '../Wizard';

export default React.createClass({
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <Wizard />
      </InlineCss>
    );
  }
});