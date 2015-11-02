import Immutable from 'immutable';
import actions from '../actionNames';
import modalNames from '../modalNames.js';

function getInitialState() {
  return Immutable.fromJS({
    currentTeam: -1,
    rowFilters: {
      viewOtherTeam: false,
      viewYourTeam: false,
      viewUndraftable: true
    },
    columnFilters: []
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.confirmModal:
      if(action.modal === modalNames.chooseCurrentTeam) {
        state = state.merge({currentTeam: action.data.inputs.currentTeam.value});
      } else if(action.modal === modalNames.filterRows) {
        state = state.merge({rowFilters: {
          viewOtherTeam: action.data.inputs.viewOtherTeam.value,
          viewYourTeam: action.data.inputs.viewYourTeam.value,
          viewUndraftable: action.data.inputs.viewUndraftable.value
        }});
      } else if(action.modal === modalNames.filterColumns) {
        state = state.merge({columnFilters: action.data.inputs.map(input => {
          return input.value;
        })});
      }
  }
  return state;
}