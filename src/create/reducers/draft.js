import Immutable from 'immutable';
import formNames from '../formNames.js';
import actions from '../../actionNames';

function getInitialState() {
  return Immutable.fromJS({
    draftId: '',
    draftPw: '',
    maxMen: 0,
    maxWomen: 0,
    saved: false
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.submitForm:
      if(action.name === formNames[4] && action.valid) {
        state = state.merge(action.inputs);
      }
      break;
    case actions.finishSave:
      if(action.success) {
        state = state.set('saved', true);
      }
      break;
  }
  return state;
}