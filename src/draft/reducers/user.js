import Immutable from 'immutable';
import actions from '../../state/actions';
import modalNames from '../modalNames.js';

function getInitialState() {
  return Immutable.fromJS({
    currentTeam: -1
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.confirmModal:
      if(action.modal === modalNames.chooseCurrentTeam) {
        state = state.merge({currentTeam: action.data.currentTeam})
      }
  }
  return state;
}