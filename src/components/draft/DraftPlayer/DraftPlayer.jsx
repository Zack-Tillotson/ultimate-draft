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
    const teamId = this.props.data.teamId;
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
    const team = this.props.teams.find(team => team.id == this.props.data.teamId);
    const name = team ? team.name : '';
    const color = team ? team.color : '';
    return (
      <div className="teamForm">
        Team
        <div className="teamInput">
          <div className="teamColor" style={{backgroundColor: color}}>
          </div>
          {name}&nbsp;
        </div>
      </div>
    );
  },

  getPlayerDetail() {
    if(!this.props.data.player) {
      return null;
    }
    const players = [this.props.data.player];
    if(this.props.data.player.baggage) {
      players.push(this.props.data.player.baggage);
    }
    return <PlayerTable 
      players={players} 
      columns={this.props.columns} 
      includeBaggageSummary={false} 
      colors={false} />
  },

  getPlayerSummary() {
    return <PlayerSummary player={this.props.data.player} columns={this.props.columns} />
  },

  getBaggageSummary() {
    const player = this.props.data.player ? this.props.data.player.baggage : null;
    return <PlayerSummary player={player} columns={this.props.columns} />
  },

  getDraftErrors() {
    const errors = [];
    if(!this.props.data.player) {
      errors.push('Enter a valid player ID');
    }

    if(!this.props.data.teamId) {
      errors.push('You have not selected a team.');
    }

    if(!errors.length) {
      if(this.props.data.player.draftStatus.currentTeamUndraftable) {
        errors.push('This player is not draftable by this team. You have undrafted baggage with' +
        ' an equal or less vector.');
      }
      if(this.props.data.player.draftStatus.otherTeamsDraft) {
        errors.push('This player is already on another team.');
      }
      if(this.props.data.player.draftStatus.otherTeamBaggage) {
        errors.push('This player is baggaged by a player on another team.');
      }
      if(this.props.data.player.baggage) {
        if(this.props.data.player.baggage.draftStatus.otherTeamsDraft) {
          errors.push('This player\'s baggage is already on another team.');
        }
      }
    }
    return (
      <div className="validationItems">
        {errors.map(error => {
          return (
            <div className="validationItem" key={error}>
              {error}
            </div>
          );
        })}
      </div>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>Draft Player</h3>
        <div className="draftForm">
          {this.getPlayerForm()}
          {this.getTeamForm()}
        </div>
        <div className="draftErrors">
          {this.getDraftErrors()}
        </div>
        <div className="draftPlayers">
          <div className="draftPlayer">
            {this.getPlayerSummary()}
          </div>
          <span className="conjugate">bagagged with</span>
          <div className="draftPlayer">
            {this.getBaggageSummary()}
          </div>
        </div>
        <div className="playerDetail">
          <h5>Player Detail</h5>
          <div className="playerDetailInner">
            {this.getPlayerDetail()}
          </div>
        </div>
      </InlineCss>
    );
  }
});