import Immutable from 'immutable';
import actions from '../actionNames';

function getInitialState() {
  return Immutable.fromJS({
    name: 'Draft',
    url: ''
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.finishSave:
      if(action.success) {
        state = state.set('url', action.url);
      }
      break;
  }
  return state;
}