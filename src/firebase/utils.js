import Firebase from 'firebase';
import md5 from 'md5';

const firebaseUrlBase = 'https://diskdraft.firebaseio.com';
const version = '014';

function getVersion() {
  return version;
}

function getVersionUrl() {
  return [firebaseUrlBase, version].join('/');
}

function getSalt() {
  return 'TPZMjWAsaiNV7DRrXHq7' + version;
}

function getFirebaseUrl(path) {
  if(path) {
    return [getVersionUrl(), path, ''].join('/');
  } else {
    return getVersionUrl();
  }
}

function hashPassword(password) {
  return md5(password + getSalt());
}
export default {getVersion, hashPassword, getFirebaseUrl};