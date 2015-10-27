import actions from '../../state/actions';
import validator from './validator';

const creators = {
  submitForm(teams, valid) {
    return {
      type: actions.submitForm, 
      formName: 'TeamConfiguration',
      teams,
      valid
    };
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      submitForm(inputs) {
        const valid = validator(inputs);
        dispatch(creators.submitForm(inputs, valid));
      }
    }
  }
}

export default { creators, dispatcher };