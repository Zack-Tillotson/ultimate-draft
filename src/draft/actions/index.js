import actions from '../../actionNames';
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

export default (dispatch, props) => {
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
      loading() {
        dispatch(ui.loading());
      },
      firebase(result) {
        dispatch(firebase.data(result));
      },
      passwordRequired() {
        dispatch(firebase.passwordRequired());
      },
      blowup(message) {
        dispatch(overlay.blowup(message));
      },
      confirmModal(modalName, data = {}, connection = {}) {
        dispatch(ui.confirmModal(modalName, data, connection));
      },
      nextTutorialStep(step) {
        dispatch(ui.nextTutorialStep(step));
      },
      quitTutorial() {
        dispatch(ui.quitTutorial());
      },
      addBaggageDraft(data, connection) {
        firebase.putDraft(dispatch, connection.draftId, connection.enteredPassword, data);
      },
      saveTeams(data, connection) {
        firebase.updateTeams(dispatch, connection.draftId, connection.enteredPassword, data);
      },
      saveDraft(data, connection) {
        firebase.updateDraft(dispatch, connection.draftId, connection.enteredPassword, data);
      },
      saveVisibility(data, connection) {
        firebase.updateVisibility(dispatch, connection.draftId, data);
      },
    }
  }
}