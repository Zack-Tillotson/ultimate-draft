import React from 'react';
import {connect} from 'react-redux';
import selector from './selector';

import CsvDataEntryForm from '../CsvDataEntryForm';
import CsvDataConfigurationForm from '../CsvDataConfigurationForm';

const Wizard = React.createClass({
  render() {
    return (
      <div>
        <div>Step {this.props.step + 1} / {this.props.totalSteps}</div>
        {this.props.step === 0 && (
          <CsvDataEntryForm />
        )}
        {this.props.step === 1 && (
          <CsvDataConfigurationForm />
        )}
      </div>
    );
  }
});

export default connect(selector)(Wizard);