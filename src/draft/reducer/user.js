import Immutable from 'immutable';
import actions from '../actionNames';
import modalNames from '../modalNames.js';

function getInitialState() {
  return Immutable.fromJS({
    currentTeam: -1,
    rowFilters: {
      viewOtherTeam: true,
      viewYourTeam: true,
      viewUndraftable: true
    },
    columnFilters: []
  });
}

export default function(state = getInitialState(), action) {
  if(action.type === actions.confirmModal && action.valid) {
    switch(action.modal) {
      case modalNames.chooseCurrentTeam:
        state = state.merge({currentTeam: action.data.inputs.currentTeam.value});
        break;
      case modalNames.filterRows:
        state = state.merge({rowFilters: {
          viewOtherTeam: action.data.inputs.viewOtherTeam.value,
          viewYourTeam: action.data.inputs.viewYourTeam.value,
          viewUndraftable: action.data.inputs.viewUndraftable.value
        }});
        break;
      case modalNames.filterColumns:
        state = state.merge({columnFilters: action.data.inputs.map(input => {
          return input.value;
        })});
        break;
    }
  }
  return state;
}