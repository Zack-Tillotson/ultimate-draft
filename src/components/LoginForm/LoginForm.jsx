import React from 'react';
import InlineCss from "react-inline-css";

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const LoginForm = React.createClass({

  propTypes: {
  },

  render() {
    const services = ['google', 'facebook', 'twitter'];
    return (
      <InlineCss stylesheet={styles} componentName="container">

        {!this.props.isLoggedIn && services.map(service => (
          <div 
            key={service}
            className={["loginOption", service].join(' ')}
            onClick={this.props.dispatch.requestLogin.bind(this, service)}>
          </div>
        ))}

        {this.props.isLoggedIn && (
          <div className="welcome">
            <h4>Welcome {this.props.displayName}!</h4>
            <input type="button" onClick={this.props.dispatch.requestLogout} value="Logout" />
          </div>
        )}
        
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(LoginForm);