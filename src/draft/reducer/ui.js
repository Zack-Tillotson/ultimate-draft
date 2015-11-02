import Immutable from 'immutable';
import actions from '../actionNames';
import tabNames from '../tabNames.js';
import modals from '../modalUtil';
import modalNames from '../modalNames';

function getInitialState() {
  return Immutable.fromJS({
    tab: tabNames.players,
    modal: modalNames.chooseCurrentTeam,
    error: '',
    modalData: {},
    saving: false
  });
}

export default function(state = getInitialState(), action) {
  let modalData = {};

  switch(action.type) {
    case actions.tabClick:
      state = state.merge({
        tab: action.tabName
      });
      break;
    case actions.viewModal:
      modalData = modals.validate(action.modalName, action.data);
      state = state.merge({
        modal: action.modalName,
        modalData
      });
      break;
    case actions.confirmModal:
    case actions.cancelModal:
    case actions.syncing:
      state = state.merge({
        modal: '',
        modalData
      });
      break;
    case actions.updateModal:
      modalData = modals.validate(state.get('modal'), action.data);
      state = state.merge({modalData});
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