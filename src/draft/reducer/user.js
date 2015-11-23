import Immutable from 'immutable';
import actions from '../actionNames';
import modalNames from '../modalNames.js';

function getInitialState() {
  return Immutable.fromJS({
    viewTeam: -1,
    rowFilters: {
      viewOtherTeam: false,
      viewYourTeam: false,
      viewUndraftable: true
    },
    columnFilters: [],
    tutorialStep: 1
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
  } else if(action.type === actions.tutorialStep) {
    if(action.isQuit) {
      state = state.merge({tutorialStep: 0});
    } else {
      const tutorialStep = action.step || (state.get('tutorialStep') + 1) % 5;
      state = state.merge({tutorialStep});
    }
  }
  return state;
}