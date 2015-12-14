import React from 'react';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';
import {PulseLoader} from 'halogen';

import Utils from '../utils';
import Firebase from '../../firebase';
import firebaseUtils from '../../firebase/utils';

import selector from '../selector';
import actions from '../actions';
import tabNames from '../tabNames';
import modalNames from '../modalNames';
import styles from './styles';

import Application from '../../components/Application';
import DraftView from '../../components/draft/DraftView';
import DraftPasswordForm from '../../components/DraftPasswordForm';

const Page = React.createClass({
  
  componentDidMount() {
    this.syncFirebaseMeta()
    document.addEventListener('keydown', this.keyPressHandler);
  },

  componenWillUnmount() {
    this.disconnectFirebase();
    document.removeEventListener('keydown', this.keyPressHandler);
  },

  // When this function completes we'll know if we need to get a password from the user
  syncFirebaseMeta() {
    const firebaseId = Utils.getFirebaseId();
    if(firebaseId) {
      this.firebaseMetaRef = Firebase.sync('draftMeta/' + firebaseId, this.handleFirebaseMetadata);
      const auth = this.firebaseMetaRef.onAuth(this.handleAuth);
    } else {
      this.props.dispatch.blowup('No draft specified, unable to continue.');
    }
  },

  handleAuth() {
    this.props.dispatch.triggerLogin(...arguments);
    this.firebaseRoleRef = Firebase.sync('admins', this.handleFirebaseRole);
  },

  handleFirebaseRole(isAdmin) {
    this.props.dispatch.firebaseRoll(isAdmin);
  },

  handleFirebaseMetadata(success, data) {
    if(!success) { // Throw an error
      this.props.dispatch.blowup('Draft not found, please make sure the URL is correct');
    } else {
      if(data.hasPw) {
        this.props.dispatch.passwordRequired();
      } else {
        this.syncFirebaseDrafts();
      }
    }
  },

  syncFirebaseDrafts(password = "") {
    const firebaseId = Utils.getFirebaseId();
    const pwHash = firebaseUtils.hashPassword(password);
    if(firebaseId) {
      this.firebaseDraftsRef = Firebase.sync(
        'drafts/' + firebaseId + '/' + pwHash, 
        this.props.dispatch.draftData
      );
    }
  },

  disconnectFirebase() {
    if(this.firebaseRef) {
      this.firebaseRef.off();
    }
  },

  keyPressHandler(event) {
    if(this.props.firebase.connected) {
      switch(event.keyCode) {
        case 68: // d
          const teamId = this.props.status.nextDraft.teamId;
          this.props.dispatch.viewModal(modalNames.draftPlayer, {playerId: 1, teamId});
          break;
        case 67: // c
          this.props.dispatch.viewModal(modalNames.chooseViewTeam);
          break;
        case 13: // Enter
          // TODO this.refs.draftView.modals.confirmHandler(event);
          break;
        case 27: // Esc
          if(this.props.ui.modal) {
            this.props.dispatch.cancelModal();
          }
          break;
        case 49: // 1
          if(!this.props.ui.modal) {
            this.props.dispatch.tabClick(tabNames.players);
          }
          break;
        case 50: // 2
          if(!this.props.ui.modal) {
            this.props.dispatch.tabClick(tabNames.teams);
          }
          break;
        case 51: // 3
          if(!this.props.ui.modal) {
            this.props.dispatch.tabClick(tabNames.history);
          }
          break;
      }
    }
  },

  getError() {
    return (
      <div className="error">
        Unable to connect to the draft. Please check the draft ID and reload the page.
      </div>
    );
  },

  getSpinner() {
    return (
      <div className="error">
        <div className="spinner">
          Connecting to database.
        </div>
        <PulseLoader className="animatee" color="#999" />
      </div>
    );
  },

  getPasswordForm() {
    return (
      <div className="pwRequired">
        <div classname="title">
          A password is required to access this draft.
        </div>
        <DraftPasswordForm 
          submitHandler={this.syncFirebaseDrafts} 
          requesting={this.props.firebase.requesting} />
      </div>
    );
  },

  getDraftView() {
    return (
      <DraftView ref="draftView" {...this.props} />
    );
  },

  getContent(state) {
    switch(state) {
      case 'error': 
        return this.getError();
      case 'spinning':
        return this.getSpinner();
      case 'needPw':
        return this.getPasswordForm();
      case 'drafting':
        return this.getDraftView();
    }
  },

  render() {

    const state = 
        (this.props.firebase.broken || this.props.ui.error) ? 'error'
      : this.props.firebase.needPw ? 'needPw'
      : this.props.firebase.connected ? 'drafting'
      : 'spinning';

    return (
      <Application>
        <InlineCss stylesheet={styles} componentName="container">
          {this.getContent(state)}
         </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions)(Page);