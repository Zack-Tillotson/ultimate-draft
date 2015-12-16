import firebase from '../../../firebase/selectors';

export default state => {
  return firebase(state.firebase);
}