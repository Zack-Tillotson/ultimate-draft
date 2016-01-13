import Immutable from 'immutable';
import actions from '../../actionNames';
import modalNames from '../modalNames.js';
import utils from '../utils';

function getInitialState() {
  return Immutable.fromJS({
    viewTeam: -1,
    rowFilters: {
      viewOtherTeam: false,
      viewYourTeam: false,
      viewYourBaggage: true,
      viewUndraftableVector: true,
      viewUndraftableGender: false
    },
    columnFilters: [],
    tutorialStep: 0
  });
}

export default function(state = getInitialState(), action) {
  if(action.type === actions.confirmModal) {
    switch(action.modal) {
      case modalNames.chooseViewTeam:
        state = state.merge({viewTeam: action.data.viewTeam});
        break;
      case modalNames.filterColumns:
        state = state.merge({columnFilters: action.data});
        break;
    }
  } else if(action.type === actions.toggleFilter) {
    state = state.mergeIn(['rowFilters'], action.data);
  } else if(action.type === actions.tutorialStep) {
    if(action.isQuit) {
      state = state.merge({tutorialStep: 0});
    } else {
      const tutorialStep = action.step || (state.get('tutorialStep') + 1) % 5;
      state = state.merge({tutorialStep});
    } 
  } else if(action.type === actions.firebase) {
    if(/^userData\//.test(action.path) && !!action.data) {
      const {viewTeam} = action.data;
      if(viewTeam >= -1) {
        state = state.set('viewTeam', viewTeam);
      }
    }
  }
  return state;
}