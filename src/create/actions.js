import actions from '../state/actions';

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