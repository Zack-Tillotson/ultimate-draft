import Firebase from 'firebase';

const firebaseUrlBase = 'https://diskdraft.firebaseio.com';
const version = 'v1_0';

const alpha = ['A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T','W','X','Y'];
const numeric = ['3','4','5','6','7','8','9'];

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

function getFirebaseUrl() {
  return [firebaseUrlBase, version, getUniqueId(), ''].join('/');
}

export default {
  save(data) {
    return new Promise((resolve, reject) => {
      const firebaseUrl = getFirebaseUrl();
      const firebase = new Firebase(firebaseUrl);
      firebase.set(data, (error) => {
        firebase.off();
        if(error) {
          reject(error);
        } else {
          resolve(firebaseUrl);
        }
      });
    });
  }
}