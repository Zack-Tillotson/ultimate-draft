import Immutable from 'immutable';
import actions from '../../actionNames';
import tabNames from '../tabNames.js';
import utils from '../utils';

function getInitialState() {
  return Immutable.fromJS({
    metaConnected: false,
    draftConnected: false,
    broken: false,
    requesting: true,
    wrongPassword: false,
    draftId: utils.getFirebaseId(),
    enteredPassword: ''
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.syncing:
      state = state.set('requesting', true);
      if(typeof action.password !== 'undefined') {
        state = state.set('enteredPassword', action.password);
      }
      break;
    case actions.firebase:
      if(/draftMeta\/.+/.test(action.path)) {
        if(action.error) {
          state = state.merge({requesting: false, broken: true});
        } else {
          state = state.merge({metaConnected: true, requesting: false});
        }
      } else if(/drafts\/.+/.test(action.path)) {
        if(action.error) {
          state = state.merge({requesting: false, wrongPassword: true});
        } else {
          state = state.merge({draftConnected: true, wrongPassword: false, requesting: false});
        }
      }
      break;
  }
  return state;
}