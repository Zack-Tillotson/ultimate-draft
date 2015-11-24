import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({

  propTypes: {
    step: React.PropTypes.number.isRequired,
    nextTutorialStep: React.PropTypes.func.isRequired,
    quitTutorial: React.PropTypes.func.isRequired
  },

  tutorialLinkClickHandler(event) {
    if(this.props.step == 0) {
      this.props.nextTutorialStep();
    } else {
      this.quitClickHandler(event);
    }
  },

  quitClickHandler(event) {
    event.preventDefault();
    this.props.quitTutorial();
  },

  nextStepClickHandler(event) {
    event.preventDefault();
    this.props.nextTutorialStep();
  },

  getCurrentStep() {
    switch(this.props.step) {
      case 0:
        return '';
      case 1:
        return (
          <div className="step">
            <div className="top step1">
            </div>
            <div className="bottom step1">
              <h3>Stress free drafting made easy.</h3>
              <div className="promoImage"></div>
              <div className="navLink">
                <span className="nextStep" onClick={this.nextStepClickHandler}>
                  Learn More
                </span>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step">
            <div className="top step2">
            </div>
            <div className="bottom step2">
              <h3>The team draft order</h3>
              <div className="navLink">
                <span className="nextStep" onClick={this.nextStepClickHandler}>
                  Learn More
                </span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step">
            <div className="top step3">
            </div>
            <div className="bottom step3">
              <h3>Select your team.</h3>
              <div className="navLink">
                <span className="nextStep" onClick={this.nextStepClickHandler}>
                  Learn More
                </span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step">
            <div className="top step4">
              <h3>Click on a player to draft them.</h3>
              <div className="promoImage"></div>
            </div>
            <div className="bottom step4">
            </div>
          </div>
        );
    }
  },

  render() {
    const inTutorialClass = !!this.props.step ? 'active' : 'inactive';
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className={["tutorialLink", inTutorialClass].join(' ')} onClick={this.tutorialLinkClickHandler}>
          {!!this.props.step && 'Close'} Help
        </div>
        {!!this.props.step && (
          <div className="tutorial">
            {this.getCurrentStep()}
          </div>
        )}
      </InlineCss>
    );
  }
});