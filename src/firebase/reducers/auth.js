import Immutable from 'immutable';
import actions from '../../actionNames';

function getInitialState() {
  return Immutable.fromJS({});
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(action.path == 'auth') {
        state = Immutable.fromJS(action.data || {});
      } else if(action.path == 'auth/isAdmin') {
        state = state.merge({isAdmin: action.data});
      }
      break;
  }
  return state;
}