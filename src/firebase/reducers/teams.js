import Immutable from 'immutable';
import actions from '../../actionNames';

function getInitialState() {
  return Immutable.fromJS([]);
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(!action.error && /drafts\/.+/.test(action.path)) {
        state = Immutable.fromJS(action.data.teams);
      }
      break;
  }
  return state;
}