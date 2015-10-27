import {createSelector} from 'reselect';

const wizard = (state) => state.wizard;

export default createSelector(wizard, (wizard) => {
  return wizard.toJS();
});