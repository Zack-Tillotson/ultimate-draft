import Firebase from 'firebase';
import utils from './utils';

const children = ['players', 'teams', 'columns', 'drafts'];

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

export default {

  save(data) {
    return new Promise((resolve, reject) => {
      const path = utils.getFirebasePath();
      const firebaseUrl = utils.getFirebaseUrl(path);
      const firebase = new Firebase(firebaseUrl);
      firebase.set(data, (error) => {
        firebase.off();
        if(error) {
          reject(error);
        } else {
          resolve(path);
        }
      });
    });
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
        dispatch(child, false);
      }
    );

    return ref;
  },

  connect(path) {
    const firebaseUrl = utils.getFirebaseUrl(path);
    return new Firebase(firebaseUrl);
  }
  
}