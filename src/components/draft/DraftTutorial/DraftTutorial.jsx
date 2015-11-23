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
      this.props.nextTutorialStep(2);
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
          <div className="step step1">
            <h3>Stress free drafting designed for captains like you.</h3>
            <div className="promoImage"></div>
            <div className="navLink quit" onClick={this.quitClickHandler}>
              Get Started
            </div>
            <div className="navLink nextStep" onClick={this.nextStepClickHandler}>
              Learn More
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step step2">
            <h3>See the draft order.</h3>
            <div className="promoImage"></div>
            <div className="navLink quit" onClick={this.quitClickHandler}>
              Get Started
            </div>
            <div className="navLink nextStep" onClick={this.nextStepClickHandler}>
              Learn More
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step step3">
            <h3>Select your team.</h3>
            <div className="promoImage"></div>
            <div className="navLink quit" onClick={this.quitClickHandler}>
              Get Started
            </div>
            <div className="navLink nextStep" onClick={this.nextStepClickHandler}>
              Learn More
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step step4">
            <h3>Choose players, review teams, see the draft history.</h3>
            <div className="promoImage"></div>
            <div className="navLink quit" onClick={this.quitClickHandler}>
              Get Started
            </div>
          </div>
        );
    }
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="tutorialLink" onClick={this.tutorialLinkClickHandler}>Help</div>
        {!!this.props.step && (
          <div className="tutorial">
            {this.getCurrentStep()}
          </div>
        )}
      </InlineCss>
    );
  }
});