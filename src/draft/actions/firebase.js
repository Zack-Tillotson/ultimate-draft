import actions from '../../actionNames';
import utils from '../utils';
import Firebase from '../../firebase';
import modalNames from '../modalNames';
import overlay from './overlay';

function transformDraft(dispatch, data, tranformationFn) {
  const teamId = data.teamId;
  const playerId = data.playerId;

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

function putDraft(dispatch, data) {
  return transformDraft(dispatch, data, 

    // Upate function
    (currentData) => {

      const {teamId, playerId, type: rawType} = data;
      const type = rawType || '';

      currentData = currentData || [];
      
      if(!currentData instanceof Array) {
        currentData = Object.keys(currentData).sort().map(key => currentData[key]);
      }

      const timestamp = Date.now();

      currentData.push({teamId, playerId, type, timestamp});

      return currentData;

    }
  );
}

function unputDraft(dispatch, data) {
  return transformDraft(dispatch, data, 

    // Upate function
    (currentData) => {

      const {teamId, playerId, type} = data;

      currentData = currentData || [];
      
      if(!currentData instanceof Array) {
        currentData = Object.keys(currentData).sort().map(key => currentData[key]);
      }

      currentData = currentData.filter(draft => 
        draft.playerId != playerId || draft.teamId != teamId || draft.type != type
      );

      return currentData;

    }
  );

}

function requestingData() {
  return {type: actions.firebase, method: 'waiting'};
}

function data(result) {
  return {type: actions.firebase, ...result};
}

export default {
  putDraft, unputDraft, requestingData, data
}