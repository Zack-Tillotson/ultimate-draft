import Immutable from 'immutable';
import actions from '../../actionNames';
import formNames from '../formNames.js';
import {getInitialState as getFormInitialState} from './form.js';
import formsReducer from './form.js';

function getInitialState() {
  return Immutable.fromJS({
    currentStep: formNames[0], 
    totalSteps: formNames.length,
    forms: formNames.map(formName => getFormInitialState(formName))
  });
}

function getNextStep(action, currentStep) {
  let index = formNames.indexOf(currentStep);
  if(action.valid) {
    index = (index + 1) % formNames.length;
  }
  return formNames[index];
}

function getPreviousStep(currentStep) {
  const index = formNames.indexOf(currentStep);
  const prevIndex = Math.max(index - 1, 0);
  return formNames[prevIndex];
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
    case actions.submitForm:
      state = state.merge({
        currentStep: getNextStep(action, state.get('currentStep')),
        forms: formsReducer(state.get('forms'), action)
      });
      break;
    case actions.previousForm:
      state = state.merge({
        currentStep: getPreviousStep(state.get('currentStep'))
      });
      break;
  }
  return state;
}