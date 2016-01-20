import actions from '../../actionNames';
import utils from '../utils';
import modalNames from '../modalNames';
import firebase from './firebase';
import firebaseActions from '../../firebase';
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
      confirmModal(modalName, data = {}, connection = {}, enteredPassword = '') {
        dispatch(ui.confirmModal(modalName, data, connection, enteredPassword));
      },
      toggleFilter(data) {
        dispatch(ui.toggleFilter(data));
      },
      nextTutorialStep(step) {
        dispatch(ui.nextTutorialStep(step));
      },
      quitTutorial() {
        dispatch(ui.quitTutorial());
      },
      addBaggageDraft(data, draftId, enteredPassword) {
        firebase.putDraft(dispatch, draftId, enteredPassword, data);
      },
      saveTeams(data, draftId, enteredPassword) {
        firebase.updateTeams(dispatch, draftId, enteredPassword, data);
      },
      saveDraft(data, draftId, enteredPassword) {
        firebase.updateDraft(dispatch, draftId, enteredPassword, data);
      },
      saveVisibility(data, draftId) {
        firebase.updateVisibility(dispatch, draftId, data);
      },
      updateSortPreference(data) {
        const draftId = utils.getFirebaseId();
        const userId = firebaseActions.getUserId();
        firebase.updateSortPreference(dispatch, draftId, userId, data);
      }
    }
  }
}