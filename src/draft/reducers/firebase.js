import Immutable from 'immutable';
import actions from '../../state/actions';
import tabNames from '../tabNames.js';

function getInitialState() {
  return Immutable.fromJS({
    connected: false,
    message: ''
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(action.success) {
        state = state.merge({connected: true});
      } else {
        state = state.merge({connected: false, message: action.data});
      }
      break;
  }
  return state;
}