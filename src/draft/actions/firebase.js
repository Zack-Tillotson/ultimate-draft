import actions from '../../actionNames';
import utils from '../utils';
import firebase from '../../firebase';
import modalNames from '../modalNames';
import overlay from './overlay';

function transformDraft(dispatch, draftId, draftPw, data, tranformationFn) {

  dispatch(overlay.uploadStarting());
  
  const draftsRef = firebase.connectToDraft(draftId, draftPw);
  const draftRef = draftsRef.child('drafts').transaction(
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

function putDraft(dispatch, draftId, draftPw, data) {
  return transformDraft(dispatch, draftId, draftPw, data,

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

function unputDraft(dispatch, draftId, draftPw, data) {
  return transformDraft(dispatch, draftId, draftPw, data,

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