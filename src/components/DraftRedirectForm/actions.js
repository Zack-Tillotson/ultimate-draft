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

          const ref = firebase.connect();
          ref.child(draftId).once('value', (snapshot) => {

            if(!snapshot.exists()) {
              dispatch(creators.redirectFails(1));
            } else {
              const draftPwHash = utils.hashPassword(draftPw);
              snapshot.ref().child(draftPwHash).once('value', (snapshot) => {
                if(!snapshot.exists()) {
                  dispatch(creators.redirectFails(2));
                } else {
                  window.location = '/draft/?id=' + draftId + '/' + draftPwHash;
                }
              });
            }
          });
        });
      },
      
    }
  }
}

export default { creators, dispatcher };