import actions from '../../../actionNames';

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
      submitForm(name) {
        const valid = true;
        dispatch(creators.submitForm({name, valid}));
      }
    }
  }
}

export default { creators, dispatcher };