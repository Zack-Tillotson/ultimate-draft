import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input, Select} from 'formsy-react-components';
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

import columnTypes from './columnTypes';

const CsvDataConfigurationForm = React.createClass({

  submitHandler(columns) {
    this.props.dispatch.submitForm(columns);
  },

  mapInputs(inputs) {

    return this.props.columns.map((column, index) => {
      return {
        name: inputs['column' + index + 'name'],
        type: inputs['column' + index + 'type']
      };
    });

  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h3>Configure</h3>

        <Formsy.Form 
          onChange={this.changeHandler}
          onSubmit={this.submitHandler}
          mapping={this.mapInputs}>

          <ol className="columnList">
            {this.props.columns.map((column, index) => (
              <li className="columnItem" key={"column" + index}>

                <div className="name">
                  <Input 
                    name={'column' + index + 'name'}
                    label="Column Name"
                    type="text" 
                    value={column.name} />
                </div>

                <div className="type">
                  <Select
                    name={'column' + index + 'type'}
                    label="Type"
                    value={column.type} 
                    options={columnTypes.map(type => {
                      return {value: type.name, label: type.name}
                    })} />
                </div>

              </li>
            ))}
          </ol>

          {this.props.validation && !this.props.validation.valid && (
            <div>
              There is a problem - you must specify these columns: ID, Baggage ID.
            </div>
          )}

          <button type='submit' onClick={this.clickHandler}>Next</button>

        </Formsy.Form>

      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(CsvDataConfigurationForm);