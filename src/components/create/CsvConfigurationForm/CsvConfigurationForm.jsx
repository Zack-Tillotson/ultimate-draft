import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input, Select, Checkbox} from 'formsy-react-components';
import PlayerTable from '../../draft/PlayerTable';
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

import columnTypes from '../../../columnTypes';

const CsvConfigurationForm = React.createClass({

  propTypes: {
    inputs: React.PropTypes.array.isRequired,
    valid: React.PropTypes.bool,
    columns: React.PropTypes.array,
    navigateBackButton: React.PropTypes.object
  },

  submitHandler(inputs) {
    this.props.dispatch.submitForm(this.props.name, inputs, this.props.players);
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
        type: inputs['column' + index + 'type'],
        visible: inputs['column' + index + 'visible'],
        include: inputs['column' + index + 'include']
      };
    });

  },

  getPlayers() {
    return (
      <PlayerTable players={this.props.players} columns={this.props.columns} />
    );
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h3>Configure</h3>

        <h5>{this.props.players.length} Players</h5>
        <div>
          <div className="playerTableContainer">
            {this.getPlayers()}
          </div>
        </div>

        <Formsy.Form 
          onChange={this.changeHandler}
          onSubmit={this.submitHandler}
          mapping={this.mapInputs}>

          <ol className="columnList">
            {this.props.inputs.map((column, index) => (
              <li className="columnItem" key={"column" + index}>

                <Input 
                    name={'column' + index + 'origName'}
                    type="hidden" 
                    value={column.originalName} />

                <div className="name">
                  <Input 
                    name={'column' + index + 'name'}
                    label="Column Name"
                    type="text" 
                    value={column.name} />
                </div>

                <div className="name">
                  <Checkbox 
                    name={'column' + index + 'include'}
                    label="Include"
                    value={column.include} />
                </div>

                <div className="name">
                  <Checkbox 
                    name={'column' + index + 'visible'}
                    label="Default Visibile"
                    value={column.visible} />
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
              You must specify these column types: 
              {columnTypes.filter(type => type.required).map(type => type.name).join(', ')}
            </div>
          )}

          {this.props.navigateBackButton}
          <button type='submit'>Next</button>

        </Formsy.Form>

      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(CsvConfigurationForm);