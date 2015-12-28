import React from 'react';
import InlineCss from "react-inline-css";

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const LoginForm = React.createClass({

  getInitialState() {
    return {
      optionsDialogOpen: false
    }
  },

  dialogClickHandler() {
    this.setState({optionsDialogOpen: !this.state.optionsDialogOpen});
  },

  render() {
    const services = ['google', 'facebook', 'twitter'];
    const selectedService = this.props.authService;
    return (
      <InlineCss stylesheet={styles} componentName="container">

        {!this.props.isLoggedIn && (
          <div className="loginSection">
            {services.map(service => (
              <div 
                key={service}
                className={["loginOption", service].join(' ')}
                onClick={this.props.dispatch.requestLogin.bind(this, service)}>
                {service}
              </div>
            ))}
            <div className="securityNotice">
              We take your privacy seriously - we never share your personal information, all traffic is encrypted.
            </div>
          </div>
        )}

        {this.props.isLoggedIn && (
          <div className="welcome" onClick={this.dialogClickHandler}>
            <div className="accountInfo">
              <div className="service">
                <div className={["icon", selectedService].join(' ')}></div>
              </div>
            </div>
            <div className="displayName">{this.props.displayName}</div>
            <div className="optionDialog">
              <div className="toggle">
                {'\u25BE'}
                {this.state.optionsDialogOpen && (
                  <div className="optionsInner" onClick={this.props.dispatch.requestLogout}>
                    Logout
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(LoginForm);