import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({

  propTypes: {
    currentModalName: React.PropTypes.string
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
  
  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        {this.getCurrentModal()}
      </InlineCss>
    );
  }
});