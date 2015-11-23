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
    return (
      <div className={['controls', 'hasTeam'].join(' ')}>
        <div className="link" onClick={this.clickHandler}>
          {!this.props.user.team && 'Select Team'}
          {this.props.user.team && 'Change Team'}
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
        <div className="label">
          {this.props.user.viewTeam >= 0 && 'Your Team:'}
          {this.props.user.viewTeam < 0 && 'Team Currently Drafting:'}
        </div>
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
                {this.props.user.team.baggage.map(player => 
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