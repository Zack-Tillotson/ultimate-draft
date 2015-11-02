import {createSelector} from 'reselect';
import ModalNames from '../modalNames';
import utils from '../utils';

import base from './base';
const {user, ui, players, teams, columns, drafts, firebase} = base;

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
    .filter(player => {
      const pid = utils.getPlayerId(player, columns);
      const baggageTeamless = !getTeamForPlayer(utils.getBaggageId(player, columns), drafts);
      return getTeamForPlayer(pid, drafts) == teamId && pid != playerId && baggageTeamless;
    })
    .map(player => utils.getBaggageId(player, columns));

  const maxVector = players // Any player...
    .filter(player => baggageIds.indexOf(utils.getPlayerId(player, columns)) >= 0)
    .reduce((maxVector, player) => Math.max(maxVector, utils.getVector(player, columns)), 0);

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

export default playersWithMeta;