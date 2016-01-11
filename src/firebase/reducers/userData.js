import Immutable from 'immutable';
import actions from '../../actionNames';

function getInitialState() {
  return Immutable.fromJS({});
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(/userData\/.+/.test(action.path)) {
        state = Immutable.fromJS(action.data || {});
      }
      break;
  }
  return state;
}