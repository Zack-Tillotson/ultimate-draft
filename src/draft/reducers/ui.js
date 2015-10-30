import Immutable from 'immutable';
import actions from '../../state/actions';
import tabNames from '../tabNames.js';

function getInitialState() {
  return Immutable.fromJS({
    tab: tabNames.players,
    modal: '',
    error: '',
    modalData: {},
    saving: false
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
        modal: action.modalName,
        modalData: action.data
      });
      break;
    case actions.confirmModal:
    case actions.cancelModal:
    case actions.syncing:
      state = state.merge({
        modal: '',
        modalData: {}
      });
      break;
    case actions.updateModal:
      state = state.merge({
        modalData: action.data
      });
      break;
    case actions.blowup:
      state = state.merge({
        error: action.message
      });
      break;
    case actions.syncing:
      state = state.merge({
        saving: !action.inProgress
      });
      break;
  }
  return state;
}