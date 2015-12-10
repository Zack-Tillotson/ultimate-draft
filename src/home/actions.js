import actions from './actionNames';

const creators = {
  login(auth) {
    return {type: actions.login, auth};
  },
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      triggerLogin(auth) {
        dispatch(creators.login(auth))
      }
    },
  }
}

export default { creators, dispatcher };