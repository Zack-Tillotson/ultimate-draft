import React from 'react';

import CsvDataEntryForm from '../CsvDataEntryForm';

export default React.createClass({
  getInitialState() {
    return {
      step: 1,
      totalSteps: 5
    }
  },
  render() {
    return (
      <div>
        <div>Step {this.state.step} / {this.state.totalSteps}</div>
        {this.state.step === 1 && (
          <CsvDataEntryForm />
        )}
      </div>
    );
  }
});