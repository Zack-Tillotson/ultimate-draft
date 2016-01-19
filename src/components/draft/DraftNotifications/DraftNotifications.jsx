import React from 'react';
import InlineCss from 'react-inline-css';
import utils from '../../../draft/utils';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    drafts: React.PropTypes.array.isRequired,
    status: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
    columns: React.PropTypes.array.isRequired,
    players: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      hideSelectionTime: 0
    }
  },

  closeClickHandler(event) {
    this.setState({hideSelectionTime: Date.now()});
  },

  currentTeamDrafting() {
    return !!this.props.user.team && 
      this.props.user.viewTeam >= 0 && 
      this.props.user.team.id == this.props.status.nextDraft.teamId;
  },

  getDraftSummary(draft) {

    const teamName = draft.team.name;
    const teamColor = draft.team.color;
    const playerId = draft.playerId;
    const hasBaggage = !!draft.player.baggage;
    const baggageId = utils.getBaggageId(draft.player, this.props.columns);

    return (
      <span>
        {teamName}
        <span className="teamBox" style={{background: teamColor}} />
        &nbsp;drafted #{playerId}
        {hasBaggage && (
          <span>
            &nbsp;and #{baggageId}
          </span>
        )}
      </span>
    );
  },

  shouldShowSelection(draft) {
    return this.state.hideSelectionTime < draft.timestamp;
  },

  render() {

    const lastDraft = this.props.drafts.find((draft, index, ary) => 
      index == ary.length - 1 && ary.length > 0
    );

    const activeClass = this.currentTeamDrafting() ? 'active' : '';
    const selectionClass = !!lastDraft ? 'active' : '';

    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <div className={["draftActive", activeClass].join(' ')}>
          ⚠ Your turn to draft!
        </div>
        {!!lastDraft && this.shouldShowSelection(lastDraft) && (
          <div className={["draftSelection", selectionClass].join(' ')}>
            <div className="draftInformation">
              Draft: {this.getDraftSummary(lastDraft)}
            </div>
            <div className="hideButton" onClick={this.closeClickHandler}>
              X
            </div>
          </div>
        )}
      </InlineCss>
    );
  }
});