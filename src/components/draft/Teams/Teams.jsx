import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles';

export default React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired
  },

  getPlayer(player) {
    return (
      <li className="player" key={Math.random()}>
        {JSON.stringify(player)}
      </li>
    );
  },

  getPlayers(players) {
    return (
      <ul className="players">
        {players.map(player => this.getPlayer(player))}
      </ul>
    );
  },

  getTeam(team) {
    return (
      <div className="team" key={team.id}>
        <h5>{team.name}</h5>
        {this.getPlayers(team.players)}
      </div>
    );
  },

  getTeams(teams) {
    return (
      <div className="teams">
        {teams.map(team => this.getTeam(team))}
      </div>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        {this.getTeams(this.props.teams)}
      </InlineCss>
    );
  }
});