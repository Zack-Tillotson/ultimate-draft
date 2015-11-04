import actions from '../actionNames';
import utils from '../utils';
import firebase from './firebase';
import modalNames from '../modalNames';
import overlay from './overlay';

export default {
  tabClick(tabName) {
    return {type: actions.tabClick, tabName}
  },
  viewModal(modalName, data, valid = false) {
    return {type: actions.viewModal, modalName, data};
  },
  updateModal(data, valid = true) {
    return {type: actions.updateModal, valid, data};
  },
  confirmModal(modalName, data, valid = true) { 
    switch(modalName) {
      case modalNames.draftPlayer:
        return (dispatch) => firebase.putDraft(dispatch, data);
      case modalNames.undraftPlayer:
        return (dispatch) => firebase.unputDraft(dispatch, data);
      case modalNames.chooseCurrentTeam:
      case modalNames.filterRows:
      case modalNames.filterColumns:
        return {type: actions.confirmModal, modal: modalName, valid, data};
    }
  },
  cancelModal(modalName) {
    return {type: actions.cancelModal, modalName};
  }
};