import Immutable from 'immutable';
import actions from '../../state/actions';
import formNames from '../formNames';

function getInitialState() {
  return  Immutable.fromJS([]);
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.submitForm:
      if(action.name === formNames[1] && action.valid) {
        state = Immutable.fromJS(action.inputs);
      }
  }
  return state;
}