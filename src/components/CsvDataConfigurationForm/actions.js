import actions from '../../state/actions';
import validator from './validator';

const creators = {
  submitForm(validation) {
    return {
      type: actions.submitForm, 
      formName: 'CsvDataConfiguration',
      validation,
      valid: validation.reduce((soFar, item) => soFar && item.valid, true)
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