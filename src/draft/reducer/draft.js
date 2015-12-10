import Immutable from 'immutable';
import actions from '../actionNames';

function getInitialState() {
  return Immutable.fromJS([]);
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(action.success) {
        const draft = action.data.draft || [];
        state = Immutable.fromJS(draft);
      }
  }
  return state;
}