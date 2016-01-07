import React from 'react';
import InlineCss from "react-inline-css";

import styles from './styles.raw.less';

export default React.createClass({
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <footer>
          <a href="http://ZacheryTillotson.com">Created by Zack Tillotson</a>
          <div className="shortcuts">
              Shortcuts
            <div className="shortcut">
              <span className="label">D</span>
              :
              <span className="desc">Draft form</span>
            </div>
            <div className="shortcut">
              <span className="label">Enter</span>
              :
              <span className="desc">Confirm form</span>
            </div>
            <div className="shortcut">
              <span className="label">Esc</span>
              :
              <span className="desc">Cancel form</span>
            </div>
          </div>
        </footer>
      </InlineCss>
    );
  }
});