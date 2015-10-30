import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../PlayerTable';

import styles from './styles';

export default React.createClass({
  propTypes: {
    updateModal: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
    teams: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  getInputs() {
    const playerId = this.refs.playerId.value;
    const teamId = this.refs.teamId.value;
    return {playerId, teamId};
  },

  changeHandler(event) {
    event.preventDefault();
    this.props.updateModal(this.getInputs());
  },

  getPlayerForm() {
    return (
      <div className="playerForm">
        Player ID
        <input 
          ref="playerId"
          name="playerId" 
          type='text'
          defaultValue={this.props.data.playerId} 
          onChange={this.changeHandler}>
        </input>
      </div>
    );
  },

  getTeamForm() {
    const defaultValue = this.props.data.teamId >= 0 ? this.props.data.teamId : "";
    return (
      <div className="teamForm">
        Team
        <select 
            ref="teamId" 
            name="teamId" 
            defaultValue={defaultValue} 
            onChange={this.changeHandler}>
            <option key="default" value={""}>Choose A Team</option>
          {this.props.teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
    );
  },

  getPlayer() {
    return <PlayerTable players={[this.props.data.player]} columns={this.props.columns} />
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Draft Player</h3>
        <div className="draftForm">
          {this.getPlayerForm()}
          {this.getTeamForm()}
        </div>
        <div className="playerReview">
          {this.getPlayer()}
        </div>
      </InlineCss>
    );
  }
});