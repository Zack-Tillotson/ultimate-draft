import Firebase from 'firebase';

const firebaseUrlBase = 'https://diskdraft.firebaseio.com';
const version = 'v0_1';

const alpha = ['A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T','W','X','Y'];
const numeric = ['3','4','5','6','7','8','9'];

const onceChildren = ['players', 'teams', 'columns'];

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

function getAlpha() {
  return alpha[parseInt(Math.random() * alpha.length)]; 
}

function getNumeric() {
  return numeric[parseInt(Math.random() * numeric.length)]; 
}

function getUniqueId() {
  return getAlpha()
    + getAlpha()
    + getAlpha()
    + getAlpha()
    + getNumeric()
    + getNumeric()
    + getNumeric();
}

function getFirebasePath() {
  return [version, getUniqueId()].join('/');
}
function getFirebaseUrl(path) {
  return [firebaseUrlBase, path, ''].join('/');
}

export default {
  save(data) {
    return new Promise((resolve, reject) => {
      const path = getFirebasePath();
      const firebaseUrl = getFirebaseUrl(path);
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
  connect(path, dispatch) {

    const firebaseUrl = getFirebaseUrl(path);
    const ref = new Firebase(firebaseUrl);

    const promises = onceChildren.map(child => new Promise((resolve, reject) => {
      ref.child(child).once(
        'value', 
        snapshot => {
          if(snapshot.exists()) {
            dispatch(child, true, snapshot.val());
            resolve();  
          } else {
            dispatch(child, false);
            reject();
          }
        }, 
        error => {
          dispatch(child, false);
          reject(error);
        }
      );
    }));

    Promise.all(promises)
      .then(() => {
        dispatch('firebase', true);
      })
      .catch(() => {
        dispatch('firebase', false);
      });
    
    return ref;
  }
}