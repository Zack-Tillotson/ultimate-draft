import React from 'react';
import InlineCss from "react-inline-css";

import styles from './styles.raw.less';

export default React.createClass({
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <header>
          <h1>
            &nbsp;
            <a className="title" href="">discdraft</a>
            <div className="bground"></div>
          </h1>
        </header>
        <div className="bottomBorder"> </div>
      </InlineCss>
    );
  }
});