import Immutable from 'immutable';
import actions from '../actionNames';
import modalNames from '../modalNames.js';

function getInitialState() {
  return Immutable.fromJS({
    viewTeam: -1,
    rowFilters: {
      viewOtherTeam: true,
      viewYourTeam: true,
      viewUndraftable: true
    },
    columnFilters: []
  });
}

export default function(state = getInitialState(), action) {
  if(action.type === actions.confirmModal) {
    switch(action.modal) {
      case modalNames.chooseViewTeam:
        state = state.merge({viewTeam: action.data.viewTeam});
        break;
      case modalNames.filterRows:
        state = state.merge({rowFilters: {
          viewOtherTeam: action.data.viewOtherTeam,
          viewYourTeam: action.data.viewYourTeam,
          viewUndraftable: action.data.viewUndraftable
        }});
        break;
      case modalNames.filterColumns:
        state = state.merge({columnFilters: action.data});
        break;
    }
  }
  return state;
}