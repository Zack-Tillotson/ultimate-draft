import Firebase from 'firebase';
import utils from './utils';

function dispatchData(dispatch, child) {
  return function(snapshot) {
    dispatch(child, true, snapshot.val());
  }
}

function dispatchError(dispatch, child) {
  return function(errorObject) {
    dispatch(child, false, errorObject);
  }
}

function ensureObjPath(obj, steps) {
  if(!obj) {
    obj = {}
  }
  let pathObj = obj;
  steps.forEach(step => {
    if(!pathObj[step]) {
      pathObj[step] = {};
    }
    pathObj = pathObj[step];
  });
  return obj;
}

export default {

  save(data) {
      
    const {draftId, draftPw, ...metaData} = data.draft;
    const pw = utils.hashPassword(draftPw);
    const draftMeta = {
      hasPw: !!pw,
      visible: true,
      timestamp: Firebase.ServerValue.TIMESTAMP
    };

    data.draft = metaData;

    
    const firebase = utils.connect();

    const draftPromise = new Promise((resolve, reject) => {

      firebase.child('drafts').child(draftId).child(pw).set(data, (error) => {
        if(error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    const draftMetaPromise = new Promise((resolve, reject) => {

      firebase.child('draftMeta').child(draftId).set(draftMeta, (error) => {
        if(error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    return Promise.all([draftPromise, draftMetaPromise]);
  },

  requestAuth(service, onError) {
    const ref = utils.connect();
    ref.authWithOAuthRedirect(service, onError);
  },

  requestUnauth(service, onError) {
    const ref = utils.connect();
    ref.unauth();
  },

  syncBase(onData) {
    return utils.syncAuth(onData);
  },

  syncDraftList(onData) {
    utils.syncAuth(onData);
    utils.syncData('draftMeta', onData);
  },

  syncDraftMeta(draftId, onData) {
    utils.syncAuth(onData);
    utils.syncData('draftMeta/' + draftId, onData);
  },

  // Might be called repeatedly with different passwords
  syncDraft(draftId, pw, onData) {
    const pwHash = utils.hashPassword(pw);
    return utils.syncData(`drafts/${draftId}/${pwHash}/`, onData); 
  }
  
}