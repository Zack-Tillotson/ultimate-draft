import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Textarea} from 'formsy-react-components';

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const DataEntryForm = React.createClass({

  propTypes: {
    inputs: React.PropTypes.shape({
      csvText: React.PropTypes.string
    }).isRequired,
    valid: React.PropTypes.bool,
    navigateBackButton: React.PropTypes.object
  },
  
  submitHandler(inputs) {
    this.props.dispatch.submitForm(this.props.name, inputs);
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h3>Enter</h3>

        <Formsy.Form onSubmit={this.submitHandler}>

          <Textarea 
            name="csvText" rows={8} cols={100} label="Data in CSV form" 
            value={this.props.inputs.csvText} />

          {!this.props.valid && (
            <div>
              Copy the CSV text into the form in order to continue.
            </div>
          )}
          
          {this.props.navigateBackButton}
          <button type='submit'>Next</button>

        </Formsy.Form>

        
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(DataEntryForm);