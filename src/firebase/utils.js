import Firebase from 'firebase';
import md5 from 'md5';

const firebaseUrlBase = 'https://diskdraft.firebaseio.com';
const version = '100';

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
      onData({path, error: false, data: snapshot.val(), exists: snapshot.exists()});
    }, 
    error => {
      onData({path, error: true, data: null, exists: false, errorData: error});
    }
  );

  return ref;
}

function syncAuth(onData) {
  const ref = connect();
  ref.onAuth((auth) => {
    onData({path: 'auth', error: false, data: auth, exists: true});
    if(auth) {
      const roleRef = connect(`admins/${auth.uid}/`).once(
        'value',
        (result) => onData({path: 'auth/isAdmin', error: false, exists: true, data: true}),
        (result) => onData({path: 'auth/isAdmin', error: false, exists: true, data: false})
      );
    } else {
      onData({path: 'auth/isAdmin', error: false, exists: true, data: false})
    }
  });
}

export default {getVersion, hashPassword, syncAuth, syncData, connect};