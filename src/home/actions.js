import actions from '../actionNames';

const creators = {
  firebase(result) {
    return {type: actions.firebase, ...result};
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      firebase(result) {
        dispatch(creators.firebase(result))
      }
    }
  }
}

export default { creators, dispatcher };