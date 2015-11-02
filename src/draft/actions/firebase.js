import actions from '../actionNames';
import utils from '../utils';
import Firebase from '../../firebase';
import modalNames from '../modalNames';
import overlay from './overlay';

function transformDraft(dispatch, data, tranformationFn) {
  if(data.valid) {

    const teamId = data.inputs.teamId.value;
    const playerId = data.inputs.playerId.value;

    dispatch(overlay.uploadStarting());
    
    const firebaseId = utils.getFirebaseId();
    const draftsRef = Firebase.connect(firebaseId + '/drafts');
    const draftRef = draftsRef.transaction(
      tranformationFn,

      // On Complete
      (error, committed, snapshot) => {
        if(error) {
          dispatch(overlay.blowup(error));
        }
        dispatch(overlay.uploadFinished());
      }, 

      // Dont see intermediate states
      false 
    );
  }
}

function putDraft(dispatch, data) {
  return transformDraft(dispatch, data, 

    // Upate function
    (currentData) => {

      const teamId = data.inputs.teamId.value;
      const playerId = data.inputs.playerId.value;

      currentData = currentData || [];
      
      if(!currentData instanceof Array) {
        currentData = Object.keys(currentData).sort().map(key => currentData[key]);
      }

      currentData.push({teamId, playerId});

      return currentData;

    }
  );
}

function unputDraft(dispatch, data) {
  return transformDraft(dispatch, data, 

    // Upate function
    (currentData) => {

      const teamId = data.inputs.teamId.value;
      const playerId = data.inputs.playerId.value;

      currentData = currentData || [];
      
      if(!currentData instanceof Array) {
        currentData = Object.keys(currentData).sort().map(key => currentData[key]);
      }

      currentData = currentData.filter(draft => draft.playerId != playerId || draft.teamId != teamId);

      return currentData;

    }
  );

}

function firebase(success, data) {
  return {type: actions.firebase, success, data};
}

export default {
  putDraft, unputDraft, firebase
}