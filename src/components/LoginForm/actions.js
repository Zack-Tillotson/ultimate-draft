import actions from '../../actionNames';
import firebase from '../../firebase';

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      requestLogin(service) {
        dispatch(() => {
          firebase.requestAuth(service, (error) => {console.log("Firebase auth error!", error)});
        });
      },
      requestLogout() {
        dispatch(() => {
          firebase.requestUnauth();
        });
      }
    }
  }
}

export default { dispatcher };