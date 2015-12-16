import React from 'react';
import InlineCss from "react-inline-css";
import LoginForm from '../LoginForm';

import styles from './styles.raw.less';

export default React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <header>
          {this.props.isLoggedIn && (
            <div className="loginStatus">
              <LoginForm />
            </div>
          )}
          {!!this.props.tutorial && (
            <div className="tutorialContainer">
              {this.props.tutorial}
            </div>
          )}
          <a className="title" href="/">
            <h1>
              <div className="imageContainer">
                <img src="/assets/diskdraft120x120.png" alt="DiskDraft: Stress free drafting" />
              </div>
            </h1>
          </a>
        </header>
      </InlineCss>
    );
  }
});