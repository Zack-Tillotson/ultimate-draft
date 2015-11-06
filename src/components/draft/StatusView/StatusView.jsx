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
        <h5>Draft Order</h5>
        {this.props.status.draftOrder.map((team, index) => {
          return (
            <div 
              className={["draftOrder", index].join(' ')}
              key={index}
              style={{borderBottomColor: team.color}}>
              {team.name}
            </div>
          );
        })}
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
      <div className="team">
        <span className="title">You:</span>
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