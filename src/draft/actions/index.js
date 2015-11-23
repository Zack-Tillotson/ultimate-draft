import actions from '../actionNames';
import utils from '../utils';
import modalNames from '../modalNames';
import firebase from './firebase';
import overlay from './overlay';
import ui from './ui';

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
      firebase(success, data = {}) {
        dispatch(firebase.firebase(success, data));
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
      }
    }
  }
}