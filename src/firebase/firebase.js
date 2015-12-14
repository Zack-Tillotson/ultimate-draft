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
      
    const id = data.draft.draftId;
    const pw = utils.hashPassword(data.draft.draftPw);

    const firebaseUrl = utils.getFirebaseUrl();
    const firebase = new Firebase(firebaseUrl);

    const draftMeta = {
      hasPw: !!pw,
      visible: true,
      timestamp: Firebase.ServerValue.TIMESTAMP
    };

    const {maxMen, maxWomen} = data.draft;
    data.draft = {maxMen, maxWomen};

    const draftPromise = new Promise((resolve, reject) => {

      firebase.child('drafts').child(id).child(pw).set(data, (error) => {
        if(error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    const draftMetaPromise = new Promise((resolve, reject) => {

      firebase.child('draftMeta').child(id).set(draftMeta, (error) => {
        if(error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    return Promise.all(draftPromise, draftMetaPromise);
  },

  sync(path, dispatch) {

    const firebaseUrl = utils.getFirebaseUrl(path);
    const ref = new Firebase(firebaseUrl);

    ref.on(
      'value', 
      snapshot => {
        if(snapshot.exists()) {
          dispatch(true, snapshot.val());
        } else {
          dispatch(false);
        }
      }, 
      error => {
        dispatch(false);
      }
    );

    return ref;
  },

  connect(path) {
    const firebaseUrl = utils.getFirebaseUrl(path);
    return new Firebase(firebaseUrl);
  }
  
}