import Immutable from 'immutable';
import actions from '../../state/actions';
import tabNames from '../tabNames.js';

function getInitialState() {
  return Immutable.fromJS({
    connected: false,
    broken: false
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(action.path === 'firebase') {
        if(action.success) {
          state = state.merge({connected: true});
        } else {
          state = state.merge({connected: true, broken: true});
        }
      }
      break;
  }
  return state;
}