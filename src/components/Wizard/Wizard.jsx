import React from 'react';

export default React.createClass({
  propTypes: {
    totalSteps: React.PropTypes.number,
    currentStep: React.PropTypes.string.isRequired,
    step: React.PropTypes.number.isRequired,
    maxVisibleStep: React.PropTypes.number,
    navigateBack: React.PropTypes.func.isRequired
  },
  getNavigation() {
    return <div>Step {this.props.step} / {this.props.totalSteps} {this.props.currentStep}</div>;
  },
  getNavigateBackButton() {
    return <button onClick={this.goBackClickHandler}>Back</button>
  },
  goBackClickHandler(event) {
    event.preventDefault();
    this.props.navigateBack();
  },
  getCurrentStep() {
    const child = React.Children.toArray(this.props.children).filter(child => {
      return child.props.name === this.props.currentStep;
    })[0];
    return React.cloneElement(child, {navigateBackButton: this.getNavigateBackButton()});
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