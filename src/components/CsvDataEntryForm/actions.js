import actions from '../../state/actions';
import validator from './validator';

const creators = {
  submitForm(validation) {
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
      submitForm(inputs) {
        const validation = validator(inputs);
        dispatch(creators.submitForm(validation));
      }
    }
  }
}

export default { creators, dispatcher };