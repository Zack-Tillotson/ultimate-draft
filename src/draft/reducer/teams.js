import Immutable from 'immutable';
import actions from '../actionNames';

function getInitialState() {
  return Immutable.fromJS([]);
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(action.success) {
        state = Immutable.fromJS(action.data.teams);
      }
  }
  return state;
}