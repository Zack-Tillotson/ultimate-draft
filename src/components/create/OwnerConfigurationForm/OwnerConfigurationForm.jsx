import React from 'react';
import InlineCss from "react-inline-css";

import {connect} from 'react-redux';
import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

import LoginForm from '../../LoginForm';

const OwnerConfigurationForm = React.createClass({

  propTypes: {
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <LoginForm auth={this.props.auth} />
        {this.props.isLoggedIn && (
          <input type="submit" onClick={this.props.dispatch.submitForm} value="Next" />
        )}
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(OwnerConfigurationForm);