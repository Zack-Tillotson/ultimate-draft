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
  return wizard.toJS()
});