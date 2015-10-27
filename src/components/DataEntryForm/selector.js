import {createSelector} from 'reselect';

const name = (state, props) => props.name;
const wizard = (state) => state.wizard;
const forms = createSelector(wizard, (wizard) => wizard.get('forms'));
const form = createSelector(name, forms, (name, forms) => 
  forms.filter(form => form.get('name') === name).get(0).toJS()
);

export default createSelector(form, (form) => {
  return form;
});