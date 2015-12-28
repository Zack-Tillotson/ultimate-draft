import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';
import utils from '../../../draft/utils';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    status: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired,
  },

  clickHandler(event) {
    this.props.viewModal(modalNames.chooseViewTeam);
  },

  getChooseTeamLink() {
    return (
      <div className={['controls', 'hasTeam'].join(' ')}>
        <div className="link" onClick={this.clickHandler}>
          Select Team
        </div>
      </div>
    );
  },

  getPlayersOfGender(gender) {
    return this.props.user.team.players.filter(player => 
      utils.getGender(player, this.props.columns) == gender
    ).length;
  },

  getTeamSummary() {
    if(!this.props.user || !this.props.user.team) {
      return null;
    }
    const {team} = this.props.user;    
    return (
      <div className="teamSummary">
        <div className="teamName">
          <div className="teamColor" style={{background: team.color}} />
          {team.name}
        </div>
        <div className="modeLabel">
          &nbsp;{this.props.isAdmin && '(admin)'}
        </div>
        <table className="teamStats">
          <thead>
            <tr>
              <td>Players</td>
              <td>Male</td>
              <td>Female</td>
              <td>Undrafted Baggage</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{team.players.length}</td>
              <td>{this.getPlayersOfGender('M')}</td>
              <td>{this.getPlayersOfGender('F')}</td>
              <td>
                {!!this.props.user.team.baggage.length && (
                  <span>
                    {this.props.user.team.baggage.length} Players 
                    (Vectors: 
                    {this.props.user.team.baggage.map(player => 
                      utils.getVector(player, this.props.columns))
                    .sort()
                    .join(', ')
                    }
                    )
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        {this.getChooseTeamLink()}
        {this.getTeamSummary()}
      </InlineCss>
    );
  }
});