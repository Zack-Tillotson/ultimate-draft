import actions from '../../create/actionNames';
import validator from './validator';
import firebase from '../../firebase';

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
      submitForm() {
        const name = actions.login;
        const valid = true;
        dispatch(creators.submitForm({name, valid}));
      },
      requestLogin(service) {
        dispatch(() => {
          const ref = firebase.connect();
          ref.authWithOAuthRedirect(service, (error) => {console.log("Firebase auth error!", error)});
        });
      },
      requestLogout() {
        dispatch(() => {
          const ref = firebase.connect();
          ref.unauth();
        });
      }
    }
  }
}

export default { creators, dispatcher };