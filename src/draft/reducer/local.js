import localStorage from '../../localStorage';
import actions from '../../actionNames';
import utils from '../utils';

function getInitialState() {
  const draftId = utils.getFirebaseId();
  return {
    playerSorts: localStorage.getSortPreferences(draftId)
  }
}

export default function(state = getInitialState(), action) {
  if(action.type === actions.sortsUpdate) {
    return {
      ...state,
      playerSorts: action.data
    }
  }
  return state;
}