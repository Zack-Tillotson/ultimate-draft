import Immutable from 'immutable';
import actions from '../../state/actions';
import formNames from '../formNames.js';
import {getInitialState as getFormInitialState} from './form.js';


function getInitialState() {
  return Immutable.fromJS({
    currentStep: 1, 
    totalSteps: formNames.length,
    forms: formNames.map(formName => getFormInitialState(formName))
  });
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
  }
  return state;
}