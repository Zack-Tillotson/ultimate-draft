import actions from '../../../state/actions';
import validator from './validator';

const creators = {
  submitForm(name, inputs, valid) {
    return {
      type: actions.submitForm, 
      name,
      inputs,
      valid
    };
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      submitForm(name, inputs) {
        const valid = validator(inputs);
        dispatch(creators.submitForm(name, inputs, valid));
      }
    }
  }
}

export default { creators, dispatcher };