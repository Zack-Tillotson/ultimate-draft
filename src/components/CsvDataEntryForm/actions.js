import actions from '../../state/actions';
import validator from './validator';

const creators = {
  submitCsvDataEntryForm(validation) {
    return {
      type: actions.submitForm, 
      formName: 'CsvDataEntry',
      validation,
      valid: validation.reduce((valid, input) => valid && input.valid, true)
    };
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      submitCsvDataEntryForm(inputs) {
        const validation = validator(inputs);
        dispatch(creators.submitCsvDataEntryForm(validation));
      }
    }
  }
}

export default { creators, dispatcher };