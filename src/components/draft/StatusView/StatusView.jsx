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
        <div className="draftOrderHeaders">
          <div className="title">Draft Order</div>
        </div>
        <div className="draftOrdersInner">
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
                  )}
                </div>
                <div className="draftOrderTeam" style={{borderBottomColor: teamColor}}>
                  {teamName}
                </div>
                <div className="draftOrderPlayer">
                  {playerId}
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
      <div className="controls">
        <div className="link" onClick={this.clickHandler}>Select Team</div>
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
      <div className="teamSummary" style={{borderColor: team.color}}>
        <div className="teamName">{team.name}</div>
        <div className="teamDrafts">{team.players.length} Players</div>
        <div className="teamGenders">
          (
            {this.getPlayersOfGender('M')} M /
            {this.getPlayersOfGender('F')} F
          )
        </div>
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