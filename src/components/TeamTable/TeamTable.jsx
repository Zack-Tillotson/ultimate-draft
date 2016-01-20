import React from 'react';
import InlineCss from 'react-inline-css';
import PlayerTable from '../PlayerTable';
import styles from './styles';

export default React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired
  },

  getTeam(team) {
    return (
      <div className="team" key={team.id}>
        <h5>{team.name} <div className="teamColor" style={{background: team.color}}></div></h5>
        <h6>Drafted Players</h6>
        <PlayerTable 
          players={team.players}
          columns={this.props.columns} 
          colors={false} 
          userData={this.props.userData} />
        <h6>Undrafted Baggage</h6>
        <PlayerTable 
          players={team.baggage}
          columns={this.props.columns} 
          colors={false} 
          playerTableSort />
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