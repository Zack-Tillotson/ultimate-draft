import React from 'react';

export default React.createClass({
  propTypes: {
    updateModal: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
    teams: React.PropTypes.array.isRequired
  },

  getInputs() {
    const playerId = this.refs.playerId.value;
    const teamId = this.refs.teamId.value;
    return {playerId, teamId};
  },

  changeHandler(event) {
    event.preventDefault();
    this.props.updateModal({index: this.props.data.draftIndex, draft: this.getInputs()});
  },

  getPlayerForm() {
    return (
      <div className="player">
        <input 
          ref="playerId"
          name="playerId" 
          type='text'
          defaultValue={this.props.data.draft.playerId} 
          onChange={this.changeHandler}>
        </input>
        {JSON.stringify(this.props.data.player)}
      </div>
    );
  },

  getTeamForm() {
    const defaultValue = this.props.data.draft.teamId >= 0 ? this.props.data.draft.teamId : "";
    return (
      <div className="teamForm">
        <select 
            ref="teamId" 
            name="teamId" 
            defaultValue={defaultValue} 
            onChange={this.changeHandler}>
          {this.props.teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
    );
  },

  render() {
    return (
      <div>
        <h3>Draft Player</h3>
        {this.getPlayerForm()}
        {this.getTeamForm()}
      </div>
    );
  }
});