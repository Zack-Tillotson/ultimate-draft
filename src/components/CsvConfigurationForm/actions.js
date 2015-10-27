import actions from '../../state/actions';
import validator from './validator';

const creators = {
  submitForm(inputs, valid) {
    return {
      type: actions.submitForm, 
      formName: 'CsvConfiguration',
      inputs,
      valid
    };
  },
  previousForm() {
    return {
      type: actions.previousForm
    }
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      submitForm(inputs) {
        const valid = validator(inputs);
        dispatch(creators.submitForm(inputs, valid));
      },
      previousForm() {
        dispatch(creators.previousForm());
      }
    }
  }
}

export default { creators, dispatcher };