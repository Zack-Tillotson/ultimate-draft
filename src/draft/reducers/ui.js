import Immutable from 'immutable';
import actions from '../../state/actions';
import tabNames from '../tabNames.js';

function getInitialState() {
  return Immutable.fromJS({
    tab: tabNames.players,
    modal: '',
    error: ''
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.tabClick:
      state = state.merge({
        tab: action.tabName
      });
      break;
    case actions.viewModal:
      state = state.merge({
        modal: action.modalName
      });
      break;
    case actions.cancelModal:
      state = state.merge({
        modal: ''
      });
      break;
    case actions.blowup:
      state = state.merge({
        error: action.message
      });
      break;
  }
  return state;
}