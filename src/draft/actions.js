import actions from '../state/actions';
import utils from './utils';
import Firebase from '../firebase';

const creators = {
  tabClick(tabName) {
    return {type: actions.tabClick, tabName}
  },
  viewModal(modalName, data) {
    return {type: actions.viewModal, modalName, data};
  },
  updateModal(data) {
    return {type: actions.updateModal, data};
  },
  confirmModal: (modalName, data) => (dispatch) => {
    dispatch(creators.uploadStarting());
    const firebaseId = utils.getFirebaseId();
    const draftsRef = Firebase.connect(firebaseId + '/drafts');
    const draftRef = draftsRef.child(data.index).set(data.draft, (error) => {
      if(error) {
        dispatch(creators.blowup(error));
      }
      dispatch(creators.uploadFinished());
    });
  },
  cancelModal(modalName) {
    return {type: actions.cancelModal, modalName};
  },
  firebase(success, data) {
    return {type: actions.firebase, success, data};
  },
  blowup(message) {
    return {type: actions.blowup, message};
  },
  uploadStarting() {
    return {type: actions.syncing, inProgress: true};
  },
  uploadFinished() {
    return {type: actions.syncing, inProgress: false};
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      tabClick(tabName) {
        dispatch(creators.tabClick(tabName));
      },
      viewModal(modalName, data = {}) {
        dispatch(creators.viewModal(modalName, data));
      },
      updateModal(data = {}) {
        dispatch(creators.updateModal(data));
      },
      cancelModal(modalName) {
        dispatch(creators.cancelModal(modalName));
      },
      firebase(success, data = {}) {
        dispatch(creators.firebase(success, data));
      },
      blowup(message) {
        dispatch(creators.blowup(message));
      },
      confirmModal(modalName, data = {}) {
        dispatch(creators.confirmModal(modalName, data));
      }
    }
  }
}

export default { creators, dispatcher };