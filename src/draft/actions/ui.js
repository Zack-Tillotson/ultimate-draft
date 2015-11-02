import actions from '../actionNames';
import utils from '../utils';
import firebase from './firebase';
import modalNames from '../modalNames';
import overlay from './overlay';

export default {
  tabClick(tabName) {
    return {type: actions.tabClick, tabName}
  },
  viewModal(modalName, data) {
    return {type: actions.viewModal, modalName, data};
  },
  updateModal(data) {
    return {type: actions.updateModal, data};
  },
  confirmModal(modalName, data) { 
    switch(modalName) {
      case modalNames.draftPlayer:
        return (dispatch) => firebase.putDraft(dispatch, data);
      case modalNames.undraftPlayer:
        return (dispatch) => firebase.unputDraft(dispatch, data);
      case modalNames.chooseCurrentTeam:
      case modalNames.filterRows:
        return {type: actions.confirmModal, modal: modalName, data};
    }
  },
  cancelModal(modalName) {
    return {type: actions.cancelModal, modalName};
  }
};