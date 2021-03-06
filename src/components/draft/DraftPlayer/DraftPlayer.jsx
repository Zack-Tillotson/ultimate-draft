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

  onComponentDidMount() {
    this.refs.playerId.getInputDOMNode().focus();
  },

  validate(data) {
    return this.validatePlayer(data) && this.validateTeam(data);
  },

  validatePlayer(data) {
    if(!data.player) {
      return false;
    }

    const {draftStatus} = data.player;
    return !draftStatus.currentTeamUndraftable
        && !draftStatus.otherTeamsDraft
        && !draftStatus.otherTeamsBaggage
        && !draftStatus.currenTeamsDraft
        && !draftStatus.maleOverdraft
        && !draftStatus.femaleOverdraft;
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
          tabIndex="1"
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
      errors.push((
        <div>Enter a valid player ID</div>
      ));
    }

    if(!errors.length) {

      const {draftStatus} = this.props.data.player;

      if(draftStatus.currentTeamsDraft) {
        errors.push((
          <div>
            <img src="/assets/filters/yourteam.png" height="12" width="12" />
            This player is already drafted by this team.
          </div>
        ));
      } else if(draftStatus.otherTeamsDraft) {
        errors.push((
          <div>
            <img src="/assets/filters/otherteam.png" height="12" width="12" />
            This player is already on another team.
          </div>
        ));
      } else if(this.props.data.player.draftStatus.otherTeamsBaggage) {
        errors.push((
          <div>
            <img src="/assets/filters/otherteam.png" height="12" width="12" />
            This player is baggaged by a player on another team.
          </div>
        ));
      } else if(this.props.data.player.baggage) {

        const {draftStatus: baggageDraftStatus} = this.props.data.player.baggage;

        if(baggageDraftStatus.otherTeamsDraft) {
          errors.push((
            <div>
              <img src="/assets/filters/otherteam.png" height="12" width="12" />
              This player's baggage is already on another team.
            </div>
          ));
        }
      } 

      if(!errors.length) {

        if(draftStatus.currentTeamUndraftable) {
          errors.push((
            <div>
              <img src="/assets/filters/vectorillegal.png" height="12" width="12" />
              The team has undrafted baggage with an equal or less vector.
            </div>
          ));
        }
        
        if(this.props.data.player.draftStatus.maleOverdraft) {
          errors.push((
            <div>
              <img src="/assets/filters/genderillegal.png" height="12" width="12" />
              By drafting this player you would have too many men.
            </div>
          ));  
        }
        if(this.props.data.player.draftStatus.femaleOverdraft) {
          errors.push((
            <div>
              <img src="/assets/filters/genderillegal.png" height="12" width="12" />
              By drafting this player you would have too many women.
            </div>
          ));  
        }
      }
    }
    return (
      <div className="validationItems">
        {errors.length > 0 && (
          <div>
            <h3>This is an illigal pick.</h3>
            <ul>
              {errors.map(error => {
                return (
                  <li className="validationItem" key={error}>
                    {error}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <h3>{this.props.connection.isAdmin ? 'Draft Player' : 'Player Detail'}</h3>
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