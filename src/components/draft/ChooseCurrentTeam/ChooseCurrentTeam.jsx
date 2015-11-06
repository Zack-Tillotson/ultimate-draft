import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    teams: React.PropTypes.array.isRequired,
    currentTeam: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    updateModal: React.PropTypes.func.isRequired,
    data: React.PropTypes.object
  },

  validate(data) {
    return this.props.teams.find(team => team.id == data.currentTeam);
  },

  clickHandler(currentTeam) {
    this.props.updateModal({currentTeam});
  },

  getTeamForm() {
    const currentTeam = this.props.data ? this.props.data.currentTeam : this.props.currentTeam;
    return (
      <div className="teamForm">
        {this.props.teams.map(team => {
          const selected = currentTeam == team.id ? 'selected' : '';
          const className = [selected, 'teamChoice'].join(' ');
          return (
            <div key={team.id}
              className={className}
              onClick={this.clickHandler.bind(this, team.id)} >
              <div className="teamColor" style={{background: team.color}} />
              <div className="teamName">{team.name}</div>
            </div>
          );
        })}
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