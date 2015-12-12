import Immutable from 'immutable';
import actions from '../actionNames';

function getInitialState() {
  return Immutable.fromJS({});
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.login:
      state = Immutable.fromJS(action.auth || {});
      break;
  }
  return state;
}