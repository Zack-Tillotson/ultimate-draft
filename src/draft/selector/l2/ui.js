import {createSelector} from 'reselect';
import ModalNames from '../../modalNames';
import {ui, playerMap} from '../l1';

export const uiWithData = createSelector(ui, playerMap, (ui, playerMap) => {
  const {modalData} = ui;

  switch(ui.modal) {
    case ModalNames.draftPlayer:
    case ModalNames.undraftPlayer:
      modalData.player = playerMap[modalData.playerId];
      break;
  }

  return {...ui, modalData};
});
