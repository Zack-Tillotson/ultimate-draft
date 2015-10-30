import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../PlayerTable';

import modalNames from '../../../draft/modalNames';
import styles from './styles';

export default React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired
  },


  getTeam(team) {
    return (
      <div className="team" key={team.id}>
        <h5>{team.name}</h5>
        <PlayerTable players={team.players} columns={this.props.columns} />
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