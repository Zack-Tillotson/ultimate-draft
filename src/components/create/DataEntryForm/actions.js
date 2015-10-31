import actions from '../../../create/actionNames';
import validator from './validator';

const creators = {
  submitForm(info) {
    return {
      type: actions.submitForm,
      ...info
    };
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      submitForm(name, inputs) {
        const valid = validator(inputs);
        dispatch(creators.submitForm({name, valid, inputs}));
      }
    }
  }
}

export default { creators, dispatcher };