import actions from '../../actionNames';
import utils from '../utils';
import firebase from './firebase';
import modalNames from '../modalNames';
import overlay from './overlay';

import firebaseUtil from '../../firebase';

export default {
  tabClick(tabName) {
    return {type: actions.tabClick, tabName}
  },
  viewModal(modalName, data) {
    return {type: actions.viewModal, modalName, data};
  },
  updateModal(data) {
    return {type: actions.updateModal, data};
  },
  confirmModal(modalName, data, connection) { 
    switch(modalName) {
      case modalNames.draftPlayer:
        if(connection.isAdmin) {
          return (dispatch) => firebase.putDraft(dispatch, connection.draftId, connection.enteredPassword, data);
        }
      case modalNames.undraftPlayer:
        if(connection.isAdmin) {
          return (dispatch) => firebase.unputDraft(dispatch, connection.draftId, connection.enteredPassword, data);
        }
      case modalNames.chooseViewTeam:
        firebaseUtil
          .connectToUserData(utils.getFirebaseId(), firebaseUtil.getUserId())
          .child('viewTeam')
          .set(data.viewTeam);
      case modalNames.filterRows:
      case modalNames.filterColumns:
        return {type: actions.confirmModal, modal: modalName, data};
    }
  },
  cancelModal(modalName) {
    return {type: actions.cancelModal, modalName};
  },
  nextTutorialStep(step) {
    return {type: actions.tutorialStep, isQuit: false, step};
  },
  quitTutorial() {
    return {type: actions.tutorialStep, isQuit: true};
  },
  loading() {
    return {type: actions.syncing};
  },
  passwordEntered(password) {
    return {type: actions.syncing, password};
  }
};