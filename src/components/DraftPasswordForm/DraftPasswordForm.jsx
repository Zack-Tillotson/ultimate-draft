import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input} from 'formsy-react-components';
import {PulseLoader} from 'halogen';

import styles from './styles';

export default React.createClass({

  propTypes: {
    submitHandler: React.PropTypes.func.isRequired,
    requesting: React.PropTypes.bool.isRequired,
    isError: React.PropTypes.bool.isRequired
  },

  handleSubmit(inputs) {
    this.props.submitHandler(inputs.draftPw);
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <Formsy.Form onSubmit={this.handleSubmit}>
          <Input name="draftPw" placeholder="Enter password" />
          {this.props.requesting && (
            <PulseLoader className="animatee" color="#999" />
          )}
          <input type="submit" className="submitBtn" value="Go" disabled={!this.props.isError} />
          {!this.props.isError && (
            <PulseLoader className="animatee" color="#999" />
          )}
        </Formsy.Form>
      </InlineCss>
    );
  }
});