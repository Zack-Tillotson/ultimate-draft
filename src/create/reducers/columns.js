import Immutable from 'immutable';
import actions from '../actionNames';
import formNames from '../formNames';

function getInitialState() {
  return  Immutable.fromJS([]);
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.submitForm:
      if(action.name === formNames[1] && action.valid) {
        state = Immutable.fromJS(Object.keys(action.inputs).map(key => {
          const {valid, ...column} = action.inputs[key];
          return column;
        }));
      }
  }
  return state;
}