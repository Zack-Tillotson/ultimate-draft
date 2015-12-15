import actions from '../actionNames';

const creators = {
  goBack() {
    return {type: actions.previousForm}
  },
  firebase(result) {
    return {type: actions.firebase, ...result};
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      goBack() {
        dispatch(creators.goBack());
      },
      firebase(result) {
        dispatch(creators.firebase(result))
      }
    }
  }
}

export default { creators, dispatcher };