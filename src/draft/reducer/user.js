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
    }
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.confirmModal:
      if(action.modal === modalNames.chooseCurrentTeam) {
        state = state.merge({currentTeam: action.data.inputs.currentTeam.value});
      }
    case actions.confirmModal:
      if(action.modal === modalNames.filterRows) {
        state = state.merge({rowFilters: {
          viewOtherTeam: action.data.inputs.viewOtherTeam.value,
          viewYourTeam: action.data.inputs.viewYourTeam.value,
          viewUndraftable: action.data.inputs.viewUndraftable.value
        }});
      }
  }
  return state;
}