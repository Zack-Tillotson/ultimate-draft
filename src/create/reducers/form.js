import Immutable from 'immutable';
import actions from '../actionNames';

export function getInitialState(name) {
  return {
    name,
    valid: false,
    inputs: {}
  };
}

function formReducer(state, action) {
  if(state.get('name') === action.name) {
    const {valid, inputs} = action;
    state = state.merge({valid, inputs});
  }
  return state;
}

export default function(state, action) {
  switch(action.type) {
    case actions.submitForm:
      state = state.map(form => formReducer(form, action));
      break;
  }
  return state;
}