import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input, Select} from 'formsy-react-components';
import {connect} from 'react-redux';
import ColorSelector from '../../ColorSelector';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const DraftConfigurationForm = React.createClass({

  propTypes: {
    inputs: React.PropTypes.object.isRequired,
    valid: React.PropTypes.bool,
    navigateBackButton: React.PropTypes.object
  },

  submitHandler(data) {
    this.props.dispatch.submitForm(this.props.name, data);
  },

  render() {

    const {inputs} = this.props;

    const draftId = inputs.draftId || '';
    const draftPw = inputs.draftPw || '';
    const maxMen = inputs.maxMen || 10;
    const maxWomen = inputs.maxWomen || 6;

    return (
      <InlineCss stylesheet={styles} componentName="container">

        <Formsy.Form 
          onChange={this.changeHandler}
          onSubmit={this.submitHandler}>

          <Input
            name="draftId"
            label="Draft ID"
            value={draftId} />

          <Input
            name="draftPw"
            label="Draft Password"
            value={draftPw} />

          <Input
            name="maxMen"
            label="Maximum Men Per Team"
            value={maxMen} />

          <Input
            name="maxWomen"
            label="Maximum Women Per Team"
            value={maxWomen} />

          {!this.props.valid && (
            <div>
              There is a problem.
            </div>
          )}

          {this.props.navigateBackButton}
          <button type='submit'>Next</button>
        </Formsy.Form>
          
      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(DraftConfigurationForm);