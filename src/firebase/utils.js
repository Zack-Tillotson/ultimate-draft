import Firebase from 'firebase';

const firebaseUrlBase = 'https://diskdraft.firebaseio.com';
const version = '014';

function getVersion() {
  return version;
}

function getSalt() {
  return 'TPZMjWAsaiNV7DRrXHq7' + version;
}

function getFirebaseUrl(path) {
  if(path) {
    return [firebaseUrlBase, path, ''].join('/');
  } else {
    return firebaseUrlBase;
  }
}

export default {getVersion, getSalt, getFirebaseUrl};