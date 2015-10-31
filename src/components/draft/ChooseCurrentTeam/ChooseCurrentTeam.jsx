import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    teams: React.PropTypes.array.isRequired,
    currentTeam: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    updateModal: React.PropTypes.func.isRequired
  },

  changeHandler(event) {
    event.preventDefault();
    this.props.updateModal(this.getInputs());
  },

  getInputs() {
    const currentTeam = this.refs.teamId.value;
    return {currentTeam};
  },

  getTeamForm() {
    const defaultValue = this.props.currentTeam && this.props.currentTeam.value >= 0 
      ? this.props.currentTeam 
      : "";
    return (
      <div className="teamForm">
        <select 
            ref="teamId" 
            name="teamId" 
            defaultValue={defaultValue} 
            onChange={this.changeHandler}>
          {!defaultValue && (
            <option key="default" value={""}>Choose A Team</option>
          )}
          {this.props.teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className="teams">
          Which team do you want to draft for?
        </div>
        {this.getTeamForm()}
      </InlineCss>
    );
  }
});