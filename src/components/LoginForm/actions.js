import actions from '../../create/actionNames';
import firebase from '../../firebase';

const dispatcher = (dispatch) => {
  return {
    dispatch: {
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

export default { dispatcher };