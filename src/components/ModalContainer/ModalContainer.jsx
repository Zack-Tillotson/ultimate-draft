import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({

  propTypes: {
    currentModalName: React.PropTypes.string,
    confirmHandler: React.PropTypes.func.isRequired,
    cancelHandler: React.PropTypes.func.isRequired
  },

  getCurrentModal() {
    const child = React.Children.toArray(this.props.children).filter(child => {
      return child.props.modalName === this.props.currentModalName;
    });
    if(child.length) {
      return React.cloneElement(child[0], {});
    } else {
      return "";
    }
  },

  cancelHandler(event) {
    this.props.cancelHandler(this.props.currentModalName);
  },

  render() {
    if(this.props.currentModalName) {
      return (
        <InlineCss componentName="component" stylesheet={styles}>
          <div className="background" onClick={this.cancelHandler}>
            {this.getCurrentModal()}
          </div>
        </InlineCss>
      );
    } else {
      return null;
    }
  }
});