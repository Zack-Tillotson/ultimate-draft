import React from 'react';

export default React.createClass({
  propTypes: {
    totalSteps: React.PropTypes.number,
    currentStep: React.PropTypes.number.isRequired,
    maxVisibleStep: React.PropTypes.number
  },
  getNavigation() {
    return <div>Step {this.props.currentStep} / {this.props.totalSteps}</div>;
  },
  getCurrentStep() {
    return React.Children.toArray(this.props.children).filter(child => {
      return child.props.step === this.props.currentStep;
    });
  },
  render() {
    return (
      <div>
        {this.getNavigation()}
        {this.getCurrentStep()}
      </div>
    );
  }
});