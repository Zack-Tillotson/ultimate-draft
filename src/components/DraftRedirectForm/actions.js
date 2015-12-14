import actions from '../../home/actionNames';
import firebase from '../../firebase';
import validator from './validator';
import utils from '../../firebase/utils';

const creators = {
  startRequest() {
    return {type: actions.request, inProgress: true}
  },
  endRequest() {
    return {type: actions.request, inProgress: false}
  },
  redirectFails(errorId) {
    return {type: actions.redirect, errorId};
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      requestRedirect(inputs) {
        dispatch(() => {
          dispatch(creators.startRequest());
          const {draftId, draftPw} = inputs;

          const validity = validator(inputs);
          if(!validity) {
            dispatch(creators.redirectFails(0));
            return;
          }

          window.location = '/draft/?id=' + draftId;
        });
      },
      
    }
  }
}

export default { creators, dispatcher };