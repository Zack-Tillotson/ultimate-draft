import Firebase from 'firebase';

const firebaseUrlBase = 'https://diskdraft.firebaseio.com';
const version = 'v0_1';

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

function getFirebasePath() {
  return [version, getUniqueId()].join('/');
}
function getFirebaseUrl(path) {
  return [firebaseUrlBase, path, ''].join('/');
}

export {getUniqueId, getFirebasePath, getFirebaseUrl};