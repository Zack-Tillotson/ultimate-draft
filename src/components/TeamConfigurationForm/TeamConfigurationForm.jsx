import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input, Select} from 'formsy-react-components';
import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const TeamConfigurationForm = React.createClass({

  getInitialState() {
    return {numTeams: 10};
  },

  submitHandler(teams) {
    this.props.dispatch.submitForm(teams);
  },

  numTeamsSubmitHandler(inputs) {
    this.setState(inputs);
  },

  getTeamsInputs() {

    const ret = [];

    for(let i = 0 ; i < this.state.numTeams; i++) {
      const namespace = 'team' + i;
      ret.push(
        <div key={namespace}>
          <Input
            name={namespace + 'id'}
            type="hidden"
            value={i}/>
          <Input
            name={namespace + 'name'}
            label="Team Name"
            value={"Team " + (i + 1)}/>
        </div>
      );
    }

    return ret;

  },

  mapping(inputs) {

    const ret = [];
    for(let i = 0 ; i < this.state.numTeams; i++) {
      const namespace = 'team' + i;
      ret.push({
        id: inputs[namespace + 'id'],
        name: inputs[namespace + 'name']
      });
    }

    return ret;

  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h3>Teams</h3>

        <Formsy.Form onSubmit={this.numTeamsSubmitHandler}>
          <Input
              name="numTeams"
              label="How many teams?"
              value={this.state.numTeams}/>
          <button type="submit">Change</button>
        </Formsy.Form>

        <h5>Configure the teams</h5>
        <Formsy.Form 
          mapping={this.mapping}
          onChange={this.changeHandler}
          onSubmit={this.submitHandler}>

          {this.getTeamsInputs()}

          {!this.props.valid && (
            <div>
              There is a problem. Enter the number!
            </div>
          )}

          <button type='submit'>Next</button>

        </Formsy.Form>

      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(TeamConfigurationForm);