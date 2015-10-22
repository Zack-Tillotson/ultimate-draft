import React from 'react';
import InlineCss from "react-inline-css";

import styles from './styles.raw.less';

export default React.createClass({
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <header>
          Header
        </header>
        <div className="bottomBorder"> </div>
      </InlineCss>
    );
  }
});