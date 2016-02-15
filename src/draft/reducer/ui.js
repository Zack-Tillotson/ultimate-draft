import Immutable from 'immutable';
import actions from '../../actionNames';
import tabNames from '../tabNames.js';
import modals from '../modalUtil';
import modalNames from '../modalNames';

function getInitialState() {
  return Immutable.fromJS({
    tab: tabNames.players,
    modal: modalNames.chooseViewTeam,
    error: '',
    modalData: {},
    saving: false,
    sorts: {},
    syncError: false
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
    case actions.syncing:
      if(state.get('modal') === modalNames.chooseViewTeam) { // Don't close the choose team modal
        break;
      }
    case actions.confirmModal:
    case actions.cancelModal:
      state = state.merge({
        modal: '',
        modalData: {}
      });
      break;
    case actions.updateModal:
      state = state.merge({modalData: action.data});
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
    case actions.sorting:
      state = state.setIn(['sorts', action.sortItem], action.sort);
      break;
    case actions.firebase:
      if(/^userData\//.test(action.path) && !!action.data) {
        const {viewTeam} = action.data;
        if(viewTeam >= -1) {
          state = state.set('modal', '');
        }
      }
      break;
    case actions.errorSyncing:
      state = state.set('syncError', action.isError);
      break;
  }
  return state;
}