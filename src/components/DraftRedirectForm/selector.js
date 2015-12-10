import {createSelector} from 'reselect';

function isLoggedIn(auth) {
  return auth.has('auth')
}

export default state => {
  return {
    isLoggedIn: isLoggedIn(state.auth),
    ...state.draft.toJS()
  }
}