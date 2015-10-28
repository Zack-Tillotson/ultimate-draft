/* Given the state will return an object:

{
  totalSteps: integer,
  currentStep: integer
  maxVisibleStep: integer
}

*/

import {createSelector} from 'reselect';

const wizard = (state) => state.wizard;

export default createSelector(wizard, (wizard) => {

  const {currentStep, totalSteps, forms} = wizard.toJS();

  const step = forms.reduce((step, form, index) => {
    return form.name === currentStep ? index + 1 : step
  }, 1);
  const maxVisibleStep = forms.reduce((step, form, index) => {
    return form.valid ? index + 1 : step
  }, 1);

  return {currentStep, step, totalSteps, maxVisibleStep};

});