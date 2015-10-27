import React from 'react';
import InlineCss from "react-inline-css";

import styles from './styles';

export default React.createClass({
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <div className="topBorder"> </div>
        <footer>
          Footer
        </footer>
      </InlineCss>
    );
  }
});