import actions from './actionNames';

const creators = {
  goBack() {
    return {type: actions.previousForm}
  },
  login(auth) {
    return {type: actions.login, auth};
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      goBack() {
        dispatch(creators.goBack());
      },
      triggerLogin(auth) {
        dispatch(creators.login(auth))
      }
    }
  }
}

export default { creators, dispatcher };