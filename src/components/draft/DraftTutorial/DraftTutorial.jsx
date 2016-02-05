import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({

  propTypes: {
    
  },

  openClickHandler(event) {
    event.preventDefault();
    this.props.openFaq();
  },

  quitClickHandler(event) {
    event.preventDefault();
    this.props.closeFaq();
  },

  isFaqActive() {
    return this.props.isActive;
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        {!this.isFaqActive() && (
          <div className="tutorialLink" onClick={this.openClickHandler}>
            Help
          </div>
        )}
      </InlineCss>
    );
  }
});