import QueryString from 'query-string';
import {id, baggageId, vector, gender} from '../columnTypes';

function getPlayerId(player, columns) {
  const idColumn = columns.find(column => column.type === id.name);
  const data = player.data || player;
  return data[idColumn.name];
}

function getBaggageId(player, columns) {
  const idColumn = columns.find(column => column.type === baggageId.name);
  const data = player.data || player;
  return data[idColumn.name];  
}

function getVector(player, columns) {
  const idColumn = columns.find(column => column.type === vector.name);
  const data = player.data || player;
  return data[idColumn.name];  
}

function getTeamForPlayer(playerId, drafts) {
  const draft = drafts.find(draft => draft.playerId == playerId);
  return draft ? draft.teamId : null;
}

function getGender(player, columns) {
  const gColumn = columns.find(column => column.type === gender.name);
  const data = player.data || player;
  return data[gColumn.name];  
}

// Team has undrafted baggage vector >= player.vector
// ie For team with undrafted baggage with vectors 5 and 10, players with vectors
// 1, 6, 9, and 10 are undraftable. 11 is allowed.
function getCurrentlyUndraftable(playerId, teamId, player, players, columns, drafts) {

  if(teamId < 0) {
    return false;
  }

  const baggageIds = players
    .filter(filterPlayer => {
      const pid = getPlayerId(filterPlayer, columns);
      const baggageTeamless = getTeamForPlayer(getBaggageId(filterPlayer, columns), drafts) === null;
      return getTeamForPlayer(pid, drafts) == teamId && pid != playerId && baggageTeamless;
    })
    .map(filterPlayer => getBaggageId(filterPlayer, columns));

  const maxVector = players // Any player...
    .filter(filterPlayer => baggageIds.indexOf(getPlayerId(filterPlayer, columns)) >= 0)
    .reduce((maxVector, filterPlayer) => Math.max(maxVector, getVector(filterPlayer, columns)), 0);

  return getVector(player, columns) <= maxVector;
}

export default {

  getFirebaseId() {
    const params = QueryString.parse(location.search);
    return params.id;
  },

  getDraftStatus(contextTeamId, player, players, drafts, columns) {

    const playerId = getPlayerId(player, columns);
    const teamId = getTeamForPlayer(playerId, drafts)
    const baggageTeamId = getTeamForPlayer(getBaggageId(player, columns), drafts)

    const otherTeamsDraft = teamId != null ? (teamId != contextTeamId) : false;
    const otherTeamsBaggage = baggageTeamId != null ? (baggageTeamId != contextTeamId) : false;
    const currentTeamsDraft = teamId != null ? (teamId == contextTeamId) : false;
    const currentTeamsBaggage = baggageTeamId != null ? (baggageTeamId == contextTeamId) : false;
    const currentTeamUndraftable = !currentTeamsDraft && !currentTeamsBaggage &&
      getCurrentlyUndraftable(playerId, contextTeamId, player, players, columns, drafts);

    return {
        otherTeamsDraft, 
        otherTeamsBaggage, 
        currentTeamsDraft, 
        currentTeamsBaggage, 
        currentTeamUndraftable
      };
  },

  getPlayerId, getBaggageId, getVector, getGender

}