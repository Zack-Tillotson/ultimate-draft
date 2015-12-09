import React from 'react';
import InlineCss from "react-inline-css";
import Formsy from 'formsy-react';
import {Input, Select} from 'formsy-react-components';
import {connect} from 'react-redux';
import ColorSelector from '../../ColorSelector';

import styles from './styles';
import selector from './selector.js';
import {dispatcher} from './actions.js';

const TeamConfigurationForm = React.createClass({

  propTypes: {
    inputs: React.PropTypes.object.isRequired,
    valid: React.PropTypes.bool,
    navigateBackButton: React.PropTypes.object
  },

  getInitialState() {
    const hasTeams = !!this.props.inputs.length;
    return {
      showTeams: hasTeams,
      numTeams: hasTeams ? this.props.inputs.length : 10
    };
  },

  submitHandler(teams) {
    this.props.dispatch.submitForm(this.props.name, teams);
  },

  numTeamsSubmitHandler(inputs) {
    this.setState({...inputs, showTeams: true});
  },

  getTeamsInputs() {

    const ret = [];

    for(let i = 0 ; i < this.state.numTeams; i++) {
      
      const namespace = 'team' + i;
      const input = this.props.inputs[i] || {};

      const id = input.id || i;
      const name = input.name || 'Team ' + (i + 1);
      const color = input.color || '#fff';

      ret.push(
        <div key={namespace} className="teamSection">
          <div className="index">{i + 1}</div>
          <div className="teamInputs">
            <Input
              name={namespace + 'id'}
              type="hidden"
              value={id}/>
            <Input
              name={namespace + 'name'}
              label="Team Name"
              value={name} />
            <ColorSelector
              inputName={namespace + 'color'} 
              initialColor={color} />
          </div>
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
        name: inputs[namespace + 'name'],
        color: inputs[namespace + 'color']
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
          <button type="submit">Submit</button>
        </Formsy.Form>

        {this.state.showTeams && (
          <div>
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

              {this.props.navigateBackButton}
              <button type='submit'>Next</button>
            </Formsy.Form>
          </div>
        )}

      </InlineCss>
    );
  }
});

export default connect(selector, dispatcher)(TeamConfigurationForm);