import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../../PlayerTable';
import PlayerSummary from '../../PlayerSummary';
import utils from '../../../draft/utils';

import styles from './styles';

export default React.createClass({
  propTypes: {
    updateModal: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
    teams: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    drafts: React.PropTypes.array.isRequired,
    players: React.PropTypes.array.isRequired
  },

  validate(data) {
    return this.validatePlayer(data) && this.validateTeam(data);
  },

  validatePlayer(data) {
    if(!data.player) {
      return false;
    }

    const draftStatus = utils.getDraftStatus(data.teamId, data.player, this.props.players, this.props.drafts, this.props.columns);
    return !draftStatus.currentTeamUndraftable
        && !draftStatus.otherTeamsDraft
        && !draftStatus.otherTeamBaggage
        && !draftStatus.currentTeamsBaggage
        && !draftStatus.currenTeamsDraft;
  },

  validateTeam(data) {
    return parseInt(data.teamId) >= 0 && !!this.props.teams.find(team => team.id == data.teamId);
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
    const value = this.props.data.playerId;
    const className = this.validatePlayer(this.props.data) ? 'valid' : 'invalid';
    return (
      <div className="playerForm">
        Player ID
        <input 
          ref="playerId"
          name="playerId" 
          type='text'
          className={className}
          defaultValue={value}
          onChange={this.changeHandler}>
        </input>
      </div>
    );
  },

  getTeamForm() {
    const defaultValue = this.props.data.teamId >= 0 ? this.props.data.teamId : "";
    const className = this.validateTeam(this.props.data) ? 'valid' : 'invalid';
    return (
      <div className="teamForm">
        Team
        <select 
            ref="teamId" 
            name="teamId"
            className={className}
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

  getPlayerDetail() {
    const players = [this.props.data.player];
    if(this.props.data.player.baggage) {
      players.push(this.props.data.player.baggage);
    }
    return <PlayerTable players={players} columns={this.props.columns} includeBaggageSummary={false} />
  },

  getPlayerSummary() {
    return <PlayerSummary player={this.props.data.player} columns={this.props.columns} />
  },

  getBaggageSummary() {
    if(!this.props.data.player.baggage) {
      return 'No Baggage';
    } else {
      return <PlayerSummary player={this.props.data.player.baggage} columns={this.props.columns} />
    }
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
          <h5>Player Summary</h5>
          {this.getPlayerSummary()}
          <h5>Baggage Summary</h5>
          {this.getBaggageSummary()}
        </div>
        <div className="playerDetail">
          {this.getPlayerDetail()}
        </div>
      </InlineCss>
    );
  }
});