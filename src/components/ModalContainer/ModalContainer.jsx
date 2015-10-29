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
      return React.cloneElement(child[0], {ref: 'modal'});
    } else {
      return "";
    }
  },

  backgroundCancelHandler(event) {
    if(event.target.classList.contains('background')) {
      this.cancelHandler(event);
    }
  },

  cancelHandler(event) {
    event.preventDefault();
    this.props.cancelHandler(this.props.currentModalName);
  },

  confirmHandler(event) {
    event.preventDefault();
    this.props.confirmHandler(this.props.currentModalName, this.props.modalData);
  },

  render() {
    if(this.props.currentModalName) {
      return (
        <InlineCss componentName="component" stylesheet={styles}>
          <div className="background" onClick={this.backgroundCancelHandler}>
            <div className="foreground">
              {this.getCurrentModal()}
              <div className="modalNav">
                <div className="buttonContainer">
                  <button onClick={this.cancelHandler}>Cancel</button>
                </div>
                <div className="buttonContainer">
                  <button onClick={this.confirmHandler}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </InlineCss>
      );
    } else {
      return null;
    }
  }
});