import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    teams: React.PropTypes.array.isRequired,
    viewTeam: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    updateModal: React.PropTypes.func.isRequired,
    data: React.PropTypes.object
  },

  validate(data) {
    return true;
  },

  clickHandler(viewTeam) {
    this.props.updateModal({viewTeam});
  },

  getTeamForm() {
    const viewTeam = this.props.data ? this.props.data.viewTeam : this.props.viewTeam;
    const adminSelected = viewTeam == -1 ? 'selected' : '';
    const adminClassName = [adminSelected, 'teamChoice', 'observer'].join(' ');
    return (
      <div className="teamForm">
        <div
          className={adminClassName}
          onClick={this.clickHandler.bind(this, -1)} >
          <div className="teamName">Observer</div>
        </div>
        {this.props.teams.map(team => {
          const selected = viewTeam == team.id ? 'selected' : '';
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
          Select Your Team
        </div>
        {this.getTeamForm()}
      </InlineCss>
    );
  }
});