import actions from '../state/actions';
import utils from './utils';
import Firebase from '../firebase';
import modalNames from './modalNames';

// Saving a draft
function validateDraft(draft) {
  return {
    valid: (draft.playerId && draft.teamId >= 0)
  }
}

function putDraft(dispatch, data) {
  const validation = validateDraft(data);
  if(validation.valid) {
    dispatch(creators.uploadStarting());
    const firebaseId = utils.getFirebaseId();
    const draftsRef = Firebase.connect(firebaseId + '/drafts');
    const draftRef = draftsRef.transaction(

      // Upate function
      (currentData) => {

        currentData = currentData || [];
        
        if(!currentData instanceof Array) {
          currentData = Object.keys(currentData).sort().map(key => currentData[key]);
        }

        currentData.push(data);

        return currentData;

      },

      // On Complete
      (error, committed, snapshot) => {
        if(error) {
          dispatch(creators.blowup(error));
        }
        dispatch(creators.uploadFinished());
      }, 

      // Dont see intermediate states
      false 
    );
  }
}

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
  confirmModal(modalName, data) { 
    switch(modalName) {
      case modalNames.draftPlayer:
        return (dispatch) => putDraft(dispatch, data);
      case modalNames.chooseCurrentTeam:
        return {type: actions.confirmModal, modal: modalName, data};
    }
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