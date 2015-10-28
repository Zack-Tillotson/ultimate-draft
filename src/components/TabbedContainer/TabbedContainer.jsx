import React from 'react';
import InlineCss from 'react-inline-css';

import styles from './styles';

export default React.createClass({
  propTypes: {
    currentTabName: React.PropTypes.string.isRequired,
    tabClickHandler: React.PropTypes.func.isRequired
  },
  
  getCurrentTab() {
    const child = React.Children.toArray(this.props.children).filter(child => {
      return child.props.tabName === this.props.currentTabName;
    })[0];
    return React.cloneElement(child, {});
  },

  getChildNames() {
    return React.Children.toArray(this.props.children).map(child => child.props.tabName);
  },

  getTabActiveClass(name) {
    return name === this.props.currentTabName ? 'active' : 'inactive';
  },

  tabClickHandler(name) {
    this.props.tabClickHandler(name)
  },

  getNavigation() {
    return (
      <div className="tabs">
        {this.getChildNames().map(name => (
          <div 
            key={name}
            className={'tab ' + this.getTabActiveClass(name)}
            onClick={this.tabClickHandler.bind(this, name)}>
            {name}
          </div>
        ))}
      </div>
    );

  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        {this.getNavigation()}
        {this.getCurrentTab()}
      </InlineCss>
    );
  }
});