import actions from '../../state/actions';
import firebase from './firebase';

const creators = {
  startingSave() {return {type: actions.startSave}},
  finishedSave(success, data) {return {type: actions.finishSave, success, data}},
  saveDraft(data) {
    return dispatch => {
      dispatch(this.startingSave());
      firebase.save(data)
        .then(
           result => dispatch(this.finishedSave(true, result))
          ,result => dispatch(this.finishedSave(false, result))
        );
    }
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      saveDraft(data) {
        dispatch(creators.saveDraft(data));
      }
    }
  }
}

export default { creators, dispatcher };