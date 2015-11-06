import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input, Select, Checkbox} from 'formsy-react-components';
import PlayerTable from '../../PlayerTable';
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

    const ret = {};
    this.props.columns.forEach((column, index) => {
      ret[index] = {
        originalName: inputs['column' + index + 'origName'],
        name: inputs['column' + index + 'name'],
        type: inputs['column' + index + 'type'],
        visible: inputs['column' + index + 'visible'],
        include: !inputs['column' + index + 'include'],
        summary: inputs['column' + index + 'summary']
      };
    });
    return ret;

  },

  getPlayersArray() {
    return this.props.players.map(player => {{data: player}});
  },

  getPlayers() {
    return (
      <PlayerTable players={this.getPlayersArray()} columns={this.props.columns} colors={false} />
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
          onSubmit={this.submitHandler}
          mapping={this.mapInputs}>

          <table className="columnList">
            <thead>
              <tr>
                <td>Remove</td>
                <td>Name</td>
                <td>Type</td>
                <td>Visible</td>
                <td>Summary</td>
              </tr>
            </thead>
            <tbody>
            {this.props.inputs.map((column, index) => {
              const className = !this.props.submitted || column.valid ? 'valid' : 'invalid';
              return (
                <tr className={"columnItem " + className} key={"column" + index}>

                  <td className="booleanOption">
                    <Checkbox 
                      name={'column' + index + 'include'}
                      value={!column.include} />
                  </td>

                  <td className="name">
                    <Input 
                        name={'column' + index + 'origName'}
                        type="hidden" 
                        value={column.originalName} />
                    <Input 
                      name={'column' + index + 'name'}
                      type="text" 
                      value={column.name} />
                  </td>

                  <td className="selectOption">
                    <Select
                      name={'column' + index + 'type'}
                      value={column.type} 
                      options={columnTypes.map(type => {
                        return {value: type.name, label: type.name}
                      })} />
                  </td>

                  <td className="booleanOption">
                    <Checkbox 
                      name={'column' + index + 'visible'}
                      value={column.visible} />
                  </td>

                  <td className="booleanOption">
                    <Checkbox 
                      name={'column' + index + 'summary'}
                      value={column.summary} />
                  </td>

                </tr>
              )
            })}
            </tbody>
          </table>

          {!this.props.valid && this.props.submitted && (
            <div>
              These column types are required, please ensure they are set:
              <br />
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