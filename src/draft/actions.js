import actions from '../state/actions';

const creators = {
  tabClick(tabName) {
    return {type: actions.tabClick, tabName}
  },
  confirmModal(modalName, data) {
    return {type: actions.confirmModal, modalName, data}
  },
  cancelModal(modalName) {
    return {type: actions.cancelModal, modalName};
  },
  firebase(path, success, data) {
    return {type: actions.firebase, path, success, data};
  },
  blowup(message) {
    return {type: actions.blowup, message};
  }
};

const dispatcher = (dispatch) => {
  return {
    dispatch: {
      tabClick(tabName) {
        dispatch(creators.tabClick(tabName));
      },
      confirmModal(modalName, data = {}) {
        dispatch(creators.confirmModal(modalName, data));
      },
      cancelModal(modalName) {
        dispatch(creators.cancelModal(modalName));
      },
      firebase(path, success, data) {
        dispatch(creators.firebase(path, success, data));
      },
      blowup(message) {
        dispatch(creators.blowup(message));
      }
    }
  }
}

export default { creators, dispatcher };