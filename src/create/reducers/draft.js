import Immutable from 'immutable';
import actions from '../../state/actions';

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
        state = state.update('url', action.shareLink);
      }
      break;
  }
  return state;
}