import {createSelector} from 'reselect';
import ModalNames from '../modalNames';
import utils from '../utils';

import {ui, firebase} from './base';
import {players, playerMap} from './players';
import {teams, teamMap} from './teams';
import drafts from './drafts';
import user from './user';
import columns from './columns';
import status from './status';

const uiWithData = createSelector(ui, playerMap, drafts, (ui, playerMap, drafts) => {

  const {modalData} = ui;

  switch(ui.modal) {
    case ModalNames.draftPlayer:
    case ModalNames.undraftPlayer:
      modalData.player = playerMap[modalData.playerId];
      break;
  }

  return {...ui, modalData};
});

export default createSelector(
  [user, uiWithData, players, teams, columns, drafts, firebase, status],
  (user, ui, players, teams, columns, drafts, firebase, status) => {
  return {user, ui, players, teams, columns, drafts, firebase, status};
});