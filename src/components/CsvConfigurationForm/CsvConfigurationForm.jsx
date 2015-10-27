import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input, Select} from 'formsy-react-components';
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

import columnTypes from './columnTypes';

const CsvConfigurationForm = React.createClass({

  submitHandler(columns) {
    this.props.dispatch.submitForm(columns);
  },

  clickPrevHandler(event) {
    event.preventDefault();
    this.props.dispatch.previousForm();
  },

  mapInputs(inputs) {

    return this.props.columns.map((column, index) => {
      return {
        originalName: inputs['column' + index + 'origName'],
        name: inputs['column' + index + 'name'],
        type: inputs['column' + index + 'type']
      };
    });

  },

  getFirstPlayer() {
    if(this.props.players.length > 0) {
      return JSON.stringify(this.props.players[0]);
    } else {
      return "-- no players --";
    }
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h3>Configure</h3>

        <h5>Players</h5>
        <div>
          {this.props.players.length} Players, for example:
          <div>
            {this.getFirstPlayer()}
          </div>
        </div>

        <Formsy.Form 
          onChange={this.changeHandler}
          onSubmit={this.submitHandler}
          mapping={this.mapInputs}>

          <ol className="columnList">
            {this.props.columns.map((column, index) => (
              <li className="columnItem" key={"column" + index}>

                <Input 
                    name={'column' + index + 'origName'}
                    type="hidden" 
                    value={column.name} />

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

          {!this.props.valid && (
            <div>
              You must specify these columns: ID, Baggage ID.
            </div>
          )}

          <button type='submit'>Next</button>
          <button onClick={this.clickPrevHandler}>Prev</button>

        </Formsy.Form>

      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(CsvConfigurationForm);