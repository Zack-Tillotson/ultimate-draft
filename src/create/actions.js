import actions from './actionNames';

const creators = {
  goBack() {
    return {type: actions.previousForm}
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      goBack() {
        dispatch(creators.goBack());
      }
    }
  }
}

export default { creators, dispatcher };