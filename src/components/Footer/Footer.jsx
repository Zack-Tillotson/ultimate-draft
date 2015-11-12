import React from 'react';
import InlineCss from "react-inline-css";

import styles from './styles.raw.less';

export default React.createClass({
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <footer>
          <a href="http://ZacheryTillotson.com">Created by Zack Tillotson</a>
          Shortcuts:
          1: Players tab
          2: Teams tab
          3: History tab
          D: Draft form
          C: Choose team form
          Enter: Confirm form
          Esc: Cancel form
        </footer>
      </InlineCss>
    );
  }
});