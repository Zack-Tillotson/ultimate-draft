import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    teams: React.PropTypes.array.isRequired,
    currentTeam: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
    updateModal: React.PropTypes.func.isRequired
  },

  clickHandler(currentTeam) {
    const value = currentTeam;
    const valid = !!currentTeam;
    this.props.updateModal({valid: true, inputs: {currentTeam: {value, valid}}});
  },

  getTeamForm() {
    return (
      <div className="teamForm">
        {this.props.teams.map(team => {
          let selected = '';
          if(this.props.modalData && this.props.modalData.inputs.currentTeam.value == team.id) {
            selected = 'selected';
          }
          let current = '';
          if(this.props.currentTeam == team.id) {
            current = 'current';
          }
          const className = [selected, current, 'teamChoice'].join(' ');
          return (
            <div key={team.id}
              className={className}
              onClick={this.clickHandler.bind(this, team.id)} >
              {team.name}
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