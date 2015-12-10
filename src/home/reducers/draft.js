import Immutable from 'immutable';
import formNames from '../formNames.js';
import actions from '../actionNames';

function getInitialState() {
  return Immutable.fromJS({
    validity: {},
    submitted: false,
    inProgress: false,
    error: -1
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.request:
      const {inProgress} = action;
      state = state.merge({inProgress});
      break;
    case actions.redirect:
      switch(action.errorId) {
        case 0:
          state = state.merge(action.inputs, {error: 0, submitted: true, inProgress: false});
          break;
        case 1:
          state = state.merge({error: 1, submitted: true, inProgress: false});
          break;
        case 2:
          state = state.merge({error: 2, submitted: true, inProgress: false});
          break;
      }
    break;
  }
  return state;
}