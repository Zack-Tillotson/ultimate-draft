import {createSelector} from 'reselect';
import ModalNames from '../modalNames';
import utils from '../utils';

import base from './base';
const {user, ui, teams, columns, drafts, firebase} = base;

import players from './players';

const playerMap = createSelector(players, columns, (players, columns) => {
  const idColumn = columns.find(column => column.type === 'ID');
  const ret = {};
  players.forEach(player => ret[player[idColumn.name]] = player);
  return ret;
});

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
      modalData.player = playerMap[modalData.inputs.playerId.value];
      break;
  }

  return {...ui, modalData};
});

const userWithData = createSelector(user, teamMap, (user, teamMap) => {
  const team = user.currentTeam >= 0 ? teamMap[user.currentTeam] : null;
  return {...user, team}
});

export default createSelector(
  [userWithData, uiWithData, players, teamsWithPlayers, columns, draftsWithTeamsAndPlayers, firebase],
  (user, ui, players, teams, columns, drafts, firebase) => {
  return {user, ui, players, teams, columns, drafts, firebase};
});