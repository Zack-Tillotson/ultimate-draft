import Immutable from 'immutable';
import actions from '../actionNames';
import tabNames from '../tabNames.js';

function getInitialState() {
  return Immutable.fromJS({
    needPw: false,
    connected: false,
    broken: false,
    requesting: false,
    isAdmin: false
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(action.method == 'draftData') {
        if(action.success) {
          state = state.merge({connected: true, needPw: false, requesting: false});
        } else {
          state = state.merge({connected: false, requesting: false});
        }
      } else if(action.method == 'passwordRequired') {
        state = state.merge({needPw: true, requesting: false});
      } else if(action.method == 'waiting') {
        state = state.merge({requesting: true});
      } else if(action.method == 'role') {
        state = state.merge({isAdmin: action.isAdmin});
      }
      break;
  }
  return state;
}