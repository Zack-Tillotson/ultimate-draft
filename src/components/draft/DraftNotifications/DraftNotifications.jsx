import React from 'react';
import InlineCss from 'react-inline-css';
import Notification from 'react-notification-system';
import utils from '../../../draft/utils';

import styles from './styles.raw.less';

export default React.createClass({

  propTypes: {
    teams: React.PropTypes.array,
    drafts: React.PropTypes.array.isRequired,
    status: React.PropTypes.object.isRequired,
    user: React.PropTypes.object
  },

  componentWillReceiveProps(nextProps) {
    
    const {drafts} = this.props;

    const newDraft = nextProps.drafts.find(draft => 
      !drafts.find(findDraft => findDraft.timestamp === draft.timestamp)
    );
    if(newDraft && newDraft.timestamp > Date.now() - 15000) {
      this.addDraftNotification(newDraft);
    }

    if(nextProps.user.team) {
      if(nextProps.user.viewTeam >= 0 && nextProps.user.team.id == nextProps.status.nextDraft.teamId) {
        this.addYourTeamDraftNotification(); 
      } else {
        this.removeYourTeamDraftNotification();
      }
    }

  },

  addDraftNotification(draft) {

    const team = this.props.teams[draft.teamId];

    const title = 'Player Drafted';
    const message = team.name + ' drafted Player #' + draft.playerId;
    const level = 'info';
    const position = 'bl';
    const autoDismiss = 15;

    this.refs.notificationSystem.addNotification({title, message, level, position, autoDismiss});
  },

  addYourTeamDraftNotification() {

    const uid = 'yourteam';
    const title = 'Your Turn';
    const message = 'It is your team\'s turn to draft';
    const level = 'error';
    const position = 'bc';
    const autoDismiss = 0;
    const dismissable = false;

    this.refs.notificationSystem.addNotification(
      {uid, title, message, level, position, autoDismiss, dismissable}
    );
  },

  removeYourTeamDraftNotification() {
    const uid = 'yourteam';
    this.refs.notificationSystem.removeNotification({uid});
  },

  render() {
    return (
      <InlineCss componentName="component" stylesheet={styles}>
        <Notification ref="notificationSystem" />  
      </InlineCss>
    );
  }
});