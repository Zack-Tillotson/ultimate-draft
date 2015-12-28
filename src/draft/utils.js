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

// Current team, only return team if has been 'drafted' explicetly
function getTeamForPlayer(playerId, drafts) {
  const draft = drafts.find(draft => draft.playerId == playerId);
  return draft ? draft.teamId : null;
}

function getTeamForBaggage(player, drafts, baggageDrafts, columns) {
  const playerId = getPlayerId(player, columns)
  const baggageId = getBaggageId(player, columns)
  const draft = drafts.find(draft => draft.playerId == baggageId);
  const baggageDraft = baggageDrafts.find(draft => draft.playerId == playerId);
  return draft ? draft.teamId : baggageDraft ? baggageDraft.teamId : null;
}

function getGender(player, columns) {
  const gColumn = columns.find(column => column.type === gender.name);
  const data = player.data || player;
  return data[gColumn.name];  
}

// "Undraftable" from a ungabbage vector rule POV
// Team has undrafted baggage vector >= player.vector
// ie For team with undrafted baggage with vectors 5 and 10, players with vectors
// 1, 6, 9, and 10 are undraftable. 11 is allowed.
function getCurrentlyUndraftable(playerId, teamId, player, players, columns, drafts, baggageDrafts) {

  if(teamId < 0) {
    return false;
  }

  const hangingBaggageIds = players
    .filter(filterPlayer => {
      const pid = getPlayerId(filterPlayer, columns);
      const bid = getBaggageId(filterPlayer, columns);
      const baggageTeamless = !!bid && getTeamForPlayer(bid, drafts, baggageDrafts) === null;
      return baggageTeamless && getTeamForPlayer(pid, drafts, baggageDrafts) == teamId && pid != playerId;
    })
    .map(filterPlayer => getBaggageId(filterPlayer, columns));

  const hangingBaggageDrafts = baggageDrafts
      .filter(bagD => bagD.teamId == teamId)
      .filter(bagD => getTeamForPlayer(bagD.playerId, drafts, baggageDrafts) === null)
      .map(bagD => bagD.playerId)

  const baggageIds = hangingBaggageIds.concat(hangingBaggageDrafts)
    .sort()
    .filter((id, index, ary) => {
      return index == 0 || ary[index - 1] != id
    });

  const maxVector = players // Any player...
    .filter(filterPlayer => baggageIds.indexOf(getPlayerId(filterPlayer, columns)) >= 0)
    .reduce((maxVector, filterPlayer) => Math.max(maxVector, getVector(filterPlayer, columns)), -1);

  return getVector(player, columns) <= maxVector;
}

export default {

  hasSeenTutorial() {
    const ret = !!localStorage.getItem('diskdraft:tutorial');
    localStorage.setItem('diskdraft:tutorial', true);
    return ret;
  },

  getFirebaseId() {
    const params = QueryString.parse(location.search);
    return params.id;
  },

  getDraftStatus(contextTeamId, player, players, drafts, baggageDrafts, columns, genderDrafts, maxGenderDrafts) {

    const playerId = getPlayerId(player, columns);
    const teamId = getTeamForPlayer(playerId, drafts)
    const baggageTeamId = getTeamForBaggage(player, drafts, baggageDrafts, columns);

    let maleDraftCount = 0;
    let femaleDraftCount = 0;
    if(teamId == null && baggageTeamId == null) {
      if(getGender(player, columns) == 'M') {
        maleDraftCount++;
      } else {
        femaleDraftCount++;
      }
      const baggage = players.find(bag => getPlayerId(bag, columns) == getBaggageId(player, columns));
      if(baggage) {
        if(getGender(baggage, columns) == 'M') {
          maleDraftCount++;
        } else {
          femaleDraftCount++;
        }
      }
    }

    const otherTeamsDraft = teamId != null ? (teamId != contextTeamId) : false;
    const otherTeamsBaggage = baggageTeamId != null ? (baggageTeamId != contextTeamId) : false;
    const currentTeamsDraft = teamId != null ? (teamId == contextTeamId) : false;
    const currentTeamsBaggage = baggageTeamId != null ? (baggageTeamId == contextTeamId) : false;
    const currentTeamUndraftable = !currentTeamsDraft && !currentTeamsBaggage &&
      getCurrentlyUndraftable(playerId, contextTeamId, player, players, columns, drafts, baggageDrafts);
    const maleOverdraft = genderDrafts.male + maleDraftCount > maxGenderDrafts.maxMen;
    const femaleOverdraft = genderDrafts.female + femaleDraftCount > maxGenderDrafts.maxWomen;

    return {
        otherTeamsDraft, 
        otherTeamsBaggage, 
        currentTeamsDraft, 
        currentTeamsBaggage, 
        currentTeamUndraftable,
        maleOverdraft,
        femaleOverdraft
      };
  },

  getPlayerId, getBaggageId, getVector, getGender

}