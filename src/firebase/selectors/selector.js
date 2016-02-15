import {createSelector} from 'reselect';

function isLoggedIn(auth) {
  return auth.has('auth')
}

function isAdmin(connection) {
  return connection.get('isAdmin');
}

function authService(auth) {
  return auth.get('provider');
}

function displayName(auth) {
  
  if(!isLoggedIn(auth)) {
    return '';
  }

  switch(auth.get('provider')) {
    case 'twitter':
      return auth.getIn(['twitter', 'displayName']);
    case 'facebook':
      return auth.getIn(['facebook', 'displayName']);
    case 'google':
      return auth.getIn(['google', 'displayName']);
  }
}

function hasPw(state) {
  return state.draftMeta ? !!state.draftMeta.get('hasPw') : false;
}

function draftList(state) {
  const draftListObj = state.draftMetas ? state.draftMetas.toJS() : {};
  return Object.keys(draftListObj)
    .sort()
    .map(key => {
      return {...draftListObj[key], id: key}
    });
}

export default state => {
  return {
    isLoggedIn: isLoggedIn(state.auth),
    isAdmin: isAdmin(state.auth),
    displayName: displayName(state.auth),
    authService: authService(state.auth),
    hasPw: hasPw(state),
    draftList: draftList(state)
  }
}