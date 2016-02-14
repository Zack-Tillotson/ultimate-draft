import firebase from '../../firebase/selectors';

export default state => {
	const uid = state.firebase.auth.get('uid');
  return {...firebase(state.firebase), uid};
}