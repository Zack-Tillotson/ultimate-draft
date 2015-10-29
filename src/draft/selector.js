import {createSelector} from 'reselect';
import ModalNames from './modalNames';

const user = state => state.user;
const ui = state => state.ui;
const players = state => state.players;
const teams = state => state.teams;
const columns = state => state.columns;
const drafts = state => state.drafts;
const firebase = state => state.firebase;

const userJs = createSelector(user, user => user.toJS());
const uiJs = createSelector(ui, ui => ui.toJS());
const playersJs = createSelector(players, players => players.toJS());
const teamsJs = createSelector(teams, teams => teams.toJS());
const columnsJs = createSelector(columns, columns => columns.toJS());
const draftsJs = createSelector(drafts, drafts => drafts.toJS());
const firebaseJs = createSelector(firebase, firebase => firebase.toJS());

const playerMap = createSelector(playersJs, columnsJs, (players, columns) => {
  const idColumn = columns.find(column => column.type === 'ID');
  const ret = {};
  players.forEach(player => ret[player[idColumn.name]] = player);
  return ret;
});

const teamMap = createSelector(teamsJs, (teams) => {
  const ret = {};
  teams.forEach(team => ret[team.id] = team);
  return ret;
});

const teamsWithPlayers = createSelector(playerMap, teamsJs, draftsJs, (playerMap, teams, drafts) => {
  return teams.map(team => {
    const players = drafts
      .filter(draft => draft.teamId === team.id)
      .map(draft => playerMap[draft.playerId]);
    return {...team, players: players};
  });
});

const draftsWithTeamsAndPlayers = createSelector(draftsJs, playerMap, teamMap, (drafts, playerMap, teamMap) => {
  return drafts.map(draft => {
    const team = teamMap[draft.teamId];
    const player = playerMap[draft.playerId];
    return {...draft, team, player}
  })
});

const uiWithData = createSelector(uiJs, playerMap, draftsJs, (ui, playerMap, drafts) => {

  const modalData = ui.modalData;

  switch(ui.modal) {
    case ModalNames.draftPlayer:
      modalData.player = playerMap[modalData.draft.playerId];
      modalData.draftIndex = drafts.length;
      break;
  }

  return {...ui, modalData};
});

export default createSelector(
  [userJs, uiWithData, playersJs, teamsWithPlayers, columnsJs, draftsWithTeamsAndPlayers, firebaseJs],
  (user, ui, players, teams, columns, drafts, firebase) => {
  return {user, ui, players, teams, columns, drafts, firebase};
});