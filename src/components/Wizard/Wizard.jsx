import React from 'react';
import InlineCss from 'react-inline-css';
import styles from './styles';

export default React.createClass({

  propTypes: {
    totalSteps: React.PropTypes.number,
    currentStep: React.PropTypes.string.isRequired,
    step: React.PropTypes.number.isRequired,
    maxVisibleStep: React.PropTypes.number,
    navigateBack: React.PropTypes.func.isRequired
  },

  getNavStep(stepNum) {
    
    const current = stepNum == this.props.step;
    const active = stepNum <= this.props.maxVisibleStep;

    const currentClass = current ? 'current' : '';
    const activeClass = active ? 'active' : '';

    return (
      <div className={['step', currentClass, activeClass].join(' ')} key={'step' + stepNum}>
        {stepNum !== 1 && (<div className="stepTransition" />)}
        <div className="stepPoint">{active && !current ? '\u2713' : stepNum }</div>
      </div>
    );
  },

  getNavigation() {
    const navSteps = [];
    for(let i = 1 ; i <= this.props.totalSteps ; i++) {
       navSteps.push(this.getNavStep(i));
    }
    return (
      <div className="formNav">
        <div className="formNavTitle">
          {this.props.currentStep}
        </div>
        <div className="formNavSteps">
          {navSteps}
        </div>
      </div>
    );
  },

  getNavigateBackButton() {
    return <button onClick={this.goBackClickHandler} tabIndex="999">Back</button>
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

  componentWillUpdate(nextProps) {
    if(this.props.step != nextProps.step) {
      window.scroll(0,0);
    }
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        {this.getNavigation()}
        {this.getCurrentStep()}
      </InlineCss>
    );
  }

});