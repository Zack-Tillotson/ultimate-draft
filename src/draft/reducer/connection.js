import Immutable from 'immutable';
import actions from '../../actionNames';
import tabNames from '../tabNames.js';

function getInitialState() {
  return Immutable.fromJS({
    metaConnected: false,
    draftConnected: false,
    broken: false,
    requesting: true,
    wrongPassword: false
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.syncing:
      state = state.set('requesting', true);
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