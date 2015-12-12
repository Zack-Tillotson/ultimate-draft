import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input} from 'formsy-react-components';
import {PulseLoader} from 'halogen';

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const DraftRedirectForm = React.createClass({

  propTypes: {
  },

  handleSubmit(inputs) {
    if(!inputs.draftPw) {
      inputs.draftPw = '';
    }
    this.props.dispatch.requestRedirect(inputs);
  },

  getErrorMessage(errorId) {
    switch(errorId) {
      case 0:
        return "These are not valid inputs.";
      case 1:
        return "This is not a valid draft ID";
      case 2:
        return "This is not the correct password.";
    }
  },

  render() {
    const loadingClass = this.props.inProgress ? 'loading' : '';
    return (
      <InlineCss stylesheet={styles} componentName="container" className={loadingClass}>   
        <Formsy.Form onSubmit={this.handleSubmit}>
          <Input label="Draft ID" name="draftId" placeholder="Required" />
          <Input label="Password" name="draftPw" placeholder="Optional" />
          {this.props.submitted && this.props.error >= 0 && (
            <div className="errors">
              {this.getErrorMessage(this.props.error)}
            </div>
          )}
          {this.props.inProgress && (
            <PulseLoader className="animatee" color="#999" />
          )}
          {!this.props.inProgress && (
            <input className="submit" type="submit" />
          )}
        </Formsy.Form>
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(DraftRedirectForm);