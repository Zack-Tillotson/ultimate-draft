import {createSelector} from 'reselect';
import ModalNames from '../modalNames';
import utils from '../utils';

import {ui, teams, drafts, firebase} from './base';
import {players, playerMap} from './players';
import user from './user';
import columns from './columns';

const teamMap = createSelector(teams, (teams) => {
  const ret = {};
  teams.forEach(team => ret[team.id] = team);
  return ret;
});

const teamsWithPlayers = createSelector(playerMap, teams, drafts, (playerMap, teams, drafts) => {
  return teams.map(team => {
    const players = drafts
      .filter(draft => draft.teamId == team.id)
      .map(draft => playerMap[draft.playerId]);
    return {...team, players: players};
  });
});

const draftsWithTeamsAndPlayers = createSelector(drafts, playerMap, teamMap, (drafts, playerMap, teamMap) => {
  return drafts.map(draft => {
    const team = teamMap[draft.teamId];
    const player = playerMap[draft.playerId];
    return {...draft, team, player}
  })
});

const uiWithData = createSelector(ui, playerMap, drafts, (ui, playerMap, drafts) => {

  const modalData = ui.modalData;

  switch(ui.modal) {
    case ModalNames.draftPlayer:
    case ModalNames.undraftPlayer:
      modalData.player = playerMap[modalData.playerId];
      break;
  }

  return {...ui, modalData};
});


export default createSelector(
  [user, uiWithData, players, teamsWithPlayers, columns, draftsWithTeamsAndPlayers, firebase],
  (user, ui, players, teams, columns, drafts, firebase) => {
  return {user, ui, players, teams, columns, drafts, firebase};
});