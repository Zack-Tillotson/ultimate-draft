import React from 'react';
import InlineCss from "react-inline-css";

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

export default connect(selector, dispatcher)(React.createClass({
  clickHandler(event) {
    event.preventDefault();
    this.props.dispatch.submitCsvDataEntryForm(this.getInputData());
  },
  getInputData() {
    return [{name: 'csvText', value: this.refs.csvText.value}];
  },
  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h3>Enter player data</h3>
        <ul>
          <li>Data must be in CSV format</li>
        </ul>
        <div>
          <textarea ref="csvText" width="50" height="8"></textarea>
        </div>
        {this.props.validation && !this.props.validation.valid && (
          <div>
            Sorry, this text is not in the correct form.
          </div>
        )}
        
        <button type='submit' onClick={this.clickHandler}>Next</button>
      </InlineCss>
    );
  }
}));