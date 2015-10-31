import actions from '../../../create/actionNames';
import validator from './validator';

const creators = {

  submitForm(name, inputs, valid, players) {
    return {
      type: actions.submitForm, 
      name,
      inputs,
      valid,
      players
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

      submitForm(name, inputs, players) {
        const valid = validator(inputs);
        dispatch(creators.submitForm(name, inputs, valid, players));
      },

      previousForm() {
        dispatch(creators.previousForm());
      }

    }
  }
}

export default { creators, dispatcher };