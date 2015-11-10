import React from 'react';
import InlineCss from 'react-inline-css';
import modalNames from '../../../draft/modalNames';
import utils from '../../../draft/utils';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    team: React.PropTypes.object,
    status: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired,
    viewModal: React.PropTypes.func.isRequired
  },

  clickHandler(event) {
    this.props.viewModal(modalNames.chooseViewTeam);
  },

  getDraftOrder() {
    return (
      <div className="draftOrders">
        <div className="draftOrdersInner">
          <div 
            className={['draftOrder', 'legend'].join(' ')}>
            <div className="draftOrderHeader">
              Draft Order
            </div>
            <div className="draftOrderTeam">
              Team
            </div>
            <div className="draftOrderPlayer">
              Player
            </div>
          </div>
          {this.props.status.draftOrder.map((draftOrder, index) => {
            const current = draftOrder.current ? 'current' : '';
            const nextUp = draftOrder.next ? 'next' : '';
            const teamColor = draftOrder.team ? draftOrder.team.color : '';
            const teamName = draftOrder.team ? draftOrder.team.name : '';
            const playerId = draftOrder.playerId !== '' ? 'Player ' + draftOrder.playerId : '';
            return (
              <div 
                className={["draftOrder", current].join(' ')}
                key={index}>
                <div className="draftOrderHeader">
                  {draftOrder.current && (
                    'Current'
                  )}
                  {draftOrder.next && (
                    'Next Up'
                  )}&nbsp;
                </div>
                <div className="draftOrderTeam" style={{borderBottomColor: teamColor}}>
                  {teamName}&nbsp;
                </div>
                <div className="draftOrderPlayer">
                  {playerId}&nbsp;
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },

  getChooseTeamLink() {
    const hasTeamClass = this.props.team ? 'hasTeam' : 'noTeam';
    return (
      <div className={["controls", hasTeamClass].join(' ')}>
        <div className="link" onClick={this.clickHandler}>
          {!this.props.team && 'Select Team'}
          {this.props.team && 'Change Team'}
        </div>
        {!this.props.team && (
          <div className="explanation">Selecting a team lets you see which players are available for your team.</div>
        )}
      </div>
    );
  },

  getPlayersOfGender(gender) {
    return this.props.team.players.filter(player => 
      utils.getGender(player, this.props.columns) == gender
    ).length;
  },

  getTeamSummary() {
    const {team} = this.props;
    if(!team) {
      return null;
    }
    return (
      <div className="teamSummary">
        <div className="label">Your Team:</div>
        <div className="teamName">
          <div className="teamColor" style={{background: team.color}} />
          {team.name}
        </div>
        <table className="teamStats">
          <thead>
            <tr>
              <td>Players</td>
              <td>Male</td>
              <td>Female</td>
              <td>Baggage (Vectors)</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{team.players.length}</td>
              <td>{this.getPlayersOfGender('M')}</td>
              <td>{this.getPlayersOfGender('F')}</td>
              <td>
                {this.props.team.baggage.map(player => 
                  utils.getVector(player, this.props.columns))
                .sort()
                .join(', ')
                }
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
        {this.getDraftOrder()}
        {this.getChooseTeamLink()}
        {this.getTeamSummary()}
      </InlineCss>
    );
  }
});