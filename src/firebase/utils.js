import Firebase from 'firebase';
import md5 from 'md5';

const firebaseUrlBase = 'https://diskdraft.firebaseio.com';
const version = '015';

function getVersionUrl() {
  return [firebaseUrlBase, version].join('/');
}

function getSalt() {
  return 'TPZMjWAsaiNV7DRrXHq7' + version;
}

function getVersion() {
  return version;
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

function connect(path) {
  const firebaseUrl = getFirebaseUrl(path);
  return new Firebase(firebaseUrl);
}

function syncData(path, onData) {
  const ref = connect(path);
  ref.on(
    'value', 
    snapshot => {
      if(snapshot.exists()) {
        onData({path, error: false, data: snapshot.val()});
      } else {
        onData({path, error: true, data: {}});
      }
    }, 
    error => {
      console.log("Firebase error", error);
      onData({path, error: true, data: null, errorData: error});
    }
  );

  return ref;
}

function syncAuth(onData) {
  const ref = connect();
  ref.onAuth((auth) => {
    onData({path: 'auth', error: false, data: auth});
    const roleRef = syncData(
      'admins', 
      (result) => onData({path: 'auth/isAdmin', error: false, data: !result.error})
    );
  });
}

export default {getVersion, hashPassword, syncAuth, syncData, connect};