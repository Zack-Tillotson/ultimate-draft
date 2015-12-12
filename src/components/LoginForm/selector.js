import {createSelector} from 'reselect';

function isLoggedIn(auth) {
  return auth.has('auth')
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

export default state => {
  return {
    isLoggedIn: isLoggedIn(state.auth),
    displayName: displayName(state.auth),
    authService: authService(state.auth)
  }
}