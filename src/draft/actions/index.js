import actions from '../actionNames';
import utils from '../utils';
import modalNames from '../modalNames';
import firebase from './firebase';
import overlay from './overlay';
import ui from './ui';

const creators = {
  login(auth) {
    return {type: actions.login, auth};
  }
}

export default (dispatch) => {
  return {
    dispatch: {
      tabClick(tabName) {
        dispatch(ui.tabClick(tabName));
      },
      viewModal(modalName, data = {}) {
        dispatch(ui.viewModal(modalName, data));
      },
      updateModal(data = {}) {
        dispatch(ui.updateModal(data));
      },
      cancelModal(modalName) {
        dispatch(ui.cancelModal(modalName));
      },
      draftMeta(success, data = {}) {
        dispatch(firebase.requestingData());
        dispatch(firebase.draftMeta(success, data));
      },
      draftData(success, data = {}) {
        dispatch(firebase.requestingData());
        dispatch(firebase.draftData(success, data));
      },
      firebaseRoll(isAdmin) {
        dispatch(firebase.firebaseRoll(isAdmin));
      },
      passwordRequired() {
        dispatch(firebase.passwordRequired());
      },
      blowup(message) {
        dispatch(overlay.blowup(message));
      },
      confirmModal(modalName, data = {}) {
        dispatch(ui.confirmModal(modalName, data));
      },
      nextTutorialStep(step) {
        dispatch(ui.nextTutorialStep(step));
      },
      quitTutorial() {
        dispatch(ui.quitTutorial());
      },
      triggerLogin(auth) {
        dispatch(creators.login(auth))
      },
      addBaggageDraft(data) {
        firebase.putDraft(dispatch, data);
      }
    }
  }
}