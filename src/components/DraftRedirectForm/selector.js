import {createSelector} from 'reselect';

function isLoggedIn(auth) {
  return auth.has('auth')
}

function draftList(draftListObj) {
  return Object.keys(draftListObj)
    .sort()
    .map(key => {
      return {...draftListObj[key], id: key}
    });
}

export default state => {
  return {
    isLoggedIn: isLoggedIn(state.auth),
    draftList: draftList(state.draftMeta.toJS()),
    ...state.draft.toJS()
  }
}