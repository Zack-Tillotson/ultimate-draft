import {createSelector} from 'reselect';
import ModalNames from '../modalNames';
import utils from '../utils';

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

function getTeamForPlayer(playerId, drafts) {
  const draft = drafts.find(draft => draft.playerId == playerId);
  return draft ? draft.teamId : null;
}

function getCurrentlyUndraftable() {
  return false;
}

const playersWithMeta = createSelector(playersJs, draftsJs, userJs, columnsJs, 
  (players, drafts, user, columns) => {
    return players.map(player => {

      const teamId = getTeamForPlayer(utils.getPlayerId(player, columns), drafts)
      const baggageTeamId = getTeamForPlayer(utils.getBaggageId(player, columns), drafts)

      const otherTeamsDraft = teamId ? (teamId != user.currentTeam) : false;
      const otherTeamsBaggage = baggageTeamId ? (baggageTeamId != user.currentTeam) : false;
      const currentTeamsDraft = teamId ? (teamId == user.currentTeam) : false;
      const currentTeamsBaggage = baggageTeamId ? (baggageTeamId == user.currentTeam) : false;
      const currentTeamUndraftable = getCurrentlyUndraftable();

      return {...player, draftStatus: {
        otherTeamsDraft, 
        otherTeamsBaggage, 
        currentTeamsDraft, 
        currentTeamsBaggage, 
        currentTeamUndraftable
      }};
    });
});

const playerMap = createSelector(playersWithMeta, columnsJs, (players, columns) => {
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
      .filter(draft => draft.teamId == team.id)
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
    case ModalNames.undraftPlayer:
      modalData.player = playerMap[modalData.inputs.playerId.value];
      break;
  }

  return {...ui, modalData};
});

const userWithData = createSelector(userJs, teamMap, (user, teamMap) => {
  const team = user.currentTeam >= 0 ? teamMap[user.currentTeam] : null;
  return {...user, team}
});

export default createSelector(
  [userWithData, uiWithData, playersWithMeta, teamsWithPlayers, columnsJs, draftsWithTeamsAndPlayers, firebaseJs],
  (user, ui, players, teams, columns, drafts, firebase) => {
  return {user, ui, players, teams, columns, drafts, firebase};
});