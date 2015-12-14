import actions from './actionNames';

const creators = {
  login(auth) {
    return {type: actions.login, auth};
  },
  draftMeta(data, success) {
    return {type: actions.firebase, path: 'draftMeta', data, success};
  },
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      triggerLogin(auth) {
        dispatch(creators.login(auth))
      },
      draftListChanges(success, list) {
        dispatch(creators.draftMeta(list, success))
      }
    }
  }
}

export default { creators, dispatcher };