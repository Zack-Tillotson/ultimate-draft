import Immutable from 'immutable';
import actions from '../actionNames';

function getInitialState() {
  return Immutable.fromJS([]);
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.firebase:
      if(action.success) {
        const drafts = action.data.drafts || [];
        if(!drafts instanceof Array) {
          const data = Object.keys(drafts).sort().map(key => drafts[key]);
        }
        state = Immutable.fromJS(drafts);
      }
  }
  return state;
}