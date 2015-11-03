import {createSelector} from 'reselect';
import ModalNames from '../modalNames';
import utils from '../utils';

import {players, ui, teams, drafts, columns, firebase, user} from './base';

function getTeamForPlayer(playerId, drafts) {
  const draft = drafts.find(draft => draft.playerId == playerId);
  return draft ? draft.teamId : null;
}

// Team has undrafted baggage vector >= player.vector
// ie For team with undrafted baggage with vectors 5 and 10, players with vectors
// 1, 6, 9, and 10 are undraftable. 11 is allowed.
function getCurrentlyUndraftable(playerId, teamId, player, players, teams, columns, drafts) {

  if(teamId < 0) {
    return false;
  }

  const team = teams.find(team => team.id == teamId);
  const baggageIds = players
    .filter(filterPlayer => {
      const pid = utils.getPlayerId(filterPlayer, columns);
      const baggageTeamless = getTeamForPlayer(utils.getBaggageId(filterPlayer, columns), drafts) === null;
      return getTeamForPlayer(pid, drafts) == teamId && pid != playerId && baggageTeamless;
    })
    .map(filterPlayer => utils.getBaggageId(filterPlayer, columns));

  const maxVector = players // Any player...
    .filter(filterPlayer => baggageIds.indexOf(utils.getPlayerId(filterPlayer, columns)) >= 0)
    .reduce((maxVector, filterPlayer) => Math.max(maxVector, utils.getVector(filterPlayer, columns)), 0);

  return utils.getVector(player, columns) <= maxVector;
}

const playersWithMeta = createSelector(
   players, drafts, user, columns, teams,
  (players, drafts, user, columns, teams) => {
    return players.map(player => {

      const playerId = utils.getPlayerId(player, columns);
      const teamId = getTeamForPlayer(playerId, drafts)
      const baggageTeamId = getTeamForPlayer(utils.getBaggageId(player, columns), drafts)

      const otherTeamsDraft = teamId ? (teamId != user.currentTeam) : false;
      const otherTeamsBaggage = baggageTeamId ? (baggageTeamId != user.currentTeam) : false;
      const currentTeamsDraft = teamId ? (teamId == user.currentTeam) : false;
      const currentTeamsBaggage = baggageTeamId ? (baggageTeamId == user.currentTeam) : false;
      const currentTeamUndraftable = !currentTeamsDraft && !currentTeamsBaggage &&
        getCurrentlyUndraftable(playerId, user.currentTeam, player, players, teams, columns, drafts);

      return {...player, draftStatus: {
        otherTeamsDraft, 
        otherTeamsBaggage, 
        currentTeamsDraft, 
        currentTeamsBaggage, 
        currentTeamUndraftable
      }};
    });
});

const playerMap = createSelector(playersWithMeta, columns, (players, columns) => {
  const idColumn = columns.find(column => column.type === 'ID');
  const ret = {};
  players.forEach(player => ret[player[idColumn.name]] = player);
  return ret;
});

export default {players: playersWithMeta, playerMap};