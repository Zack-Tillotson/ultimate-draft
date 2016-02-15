import React from 'react';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';
import {PulseLoader} from 'halogen';

import utils from '../utils';
import firebase from '../../firebase';
import firebaseUtils from '../../firebase/utils';

import selector from '../selector';
import actions from '../actions';
import tabNames from '../tabNames';
import modalNames from '../modalNames';
import styles from './styles';

import Application from '../../components/Application';
import DraftView from '../../components/draft/DraftView';
import DraftPasswordForm from '../../components/DraftPasswordForm';
import LoginForm from '../../components/LoginForm';
import DraftTutorial from '../../components/draft/DraftTutorial';

const Page = React.createClass({
  
  componentDidMount() {
    this.firebaseSync();
    document.addEventListener('keydown', this.keyPressHandler);
    window.onbeforeunload = () => 'You are leaving this draft. All draft information will be saved.';
  },

  firebaseSync() {

    const firebaseId = utils.getFirebaseId();
    if(!firebaseId) {
      this.props.dispatch.blowup('No draft specified, unable to continue.');
    } else {
      firebase.syncDraftMeta(firebaseId, this.props.dispatch.firebase);
      firebase.syncAuth(this.authWillUpdate);
    }

  },

  authWillUpdate(authResult) {

    this.props.dispatch.firebase(authResult);

    const {auth} = authResult.data;
    if(this.userDataRef) {
      this.userDataRef.off('value', this.userDataWillUpdate);
      this.userDataRef = undefined;
    }
    if(auth) {
      this.userDataRef = firebase.syncUserData(utils.getFirebaseId(), auth.uid, this.userDataWillUpdate);
    }

  },

  userDataWillUpdate(userDataResult) {

    this.props.dispatch.firebase(userDataResult);

    if(this.draftRef) {
      this.draftRef.off('value', this.syncDraftHandler);
      this.draftRef = undefined;
    }
    const enteredPassword = !!userDataResult.data ? userDataResult.data.enteredPassword : '';
    this.startSyncDraft(enteredPassword);
  },

  startSyncDraft(password = '') {

    this.props.dispatch.errorSync(false);

    const userId = firebase.getUserId();

    firebase
      .connectToUserData(utils.getFirebaseId(), userId)
      .child('enteredPassword')
      .set(password);

    if(this.firebaseDraftRef) {
      this.firebaseDraftRef.off('value', this.syncDraftHandler);
    }
    this.firebaseDraftRef = firebase.syncDraft(utils.getFirebaseId(), password, this.syncDraftHandler);

  },

  syncDraftHandler(results) {

    if (results.exists) {
      this.props.dispatch.firebase(results);
    } else {
      setTimeout(() => {
        this.props.dispatch.errorSync(true);
      }, 400);
    }
  },

  keyPressHandler(event) {
    if(this.props.connection.draftConnected) {
      switch(event.keyCode) {
        case 68: // d
          const teamId = this.props.status.nextDraft.teamId;
          this.props.dispatch.viewModal(modalNames.draftPlayer, {playerId: 1, teamId});
          break;
        case 67: // c
          this.props.dispatch.viewModal(modalNames.chooseViewTeam);
          break;
        case 13: // Enter
          this.refs.draftView.refs.modals.confirmHandler(event);
          break;
        case 27: // Esc
          if(this.props.ui.modal) {
            this.props.dispatch.cancelModal();
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
          submitHandler={this.startSyncDraft} 
          requesting={this.props.connection.requesting}
          isError={this.props.ui.syncError} />
        {!this.props.connection.requesting && this.props.connection.wrongPassword && ('Wrong password')}
      </div>
    );
  },

  getDraftView() {
    return (
      <DraftView ref="draftView" {...this.props} />
    );
  },

  getLoginForm() {
    return (
      <LoginForm />
    );
  },

  getContent(state) {
    switch(state) {
      case 'login':
        return this.getLoginForm();
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

  getTutorial() {
    return (
      <DraftTutorial 
        isActive={this.props.ui.modal == modalNames.faq}
        openFaq={this.props.dispatch.viewModal.bind(this, modalNames.faq)}
        closeFaq={this.props.dispatch.cancelModal.bind(this)} />
    );
  },

  render() {
    
    const state = 
      (!this.props.auth.auth) ? 'login'
      : (this.props.connection.broken || this.props.ui.error) ? 'error'
      : this.props.connection.draftConnected ? 'drafting'
      : (this.props.connection.metaConnected && this.props.firebaseMeta.hasPw) ? 'needPw'
      : 'spinning';

    return (
      <Application isLoggedIn={this.props.firebaseMeta.isLoggedIn} tutorial={this.getTutorial()}>
        <InlineCss stylesheet={styles} componentName="container">
          {this.getContent(state)}
         </InlineCss>
      </Application>
    );
  }
});

export default connect(selector, actions)(Page);