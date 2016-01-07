import {createSelector} from 'reselect';
import {drafts, teams, players} from '../';

function getTeamIndexFromDraftIndex(draftIndex, numTeams) {
  const snakeIndex = draftIndex % (numTeams * 2);
  if(snakeIndex >= numTeams) {
    return 2 * numTeams - snakeIndex - 1;
  } else {
    return snakeIndex;
  }
}

function getRoundFromDraftIndex(draftIndex, teamsLength) {
  return parseInt(draftIndex / teamsLength) + 1;
}

function isStartOfRoundFromDraftIndex(draftIndex, teamsLength) {
  return draftIndex % teamsLength === 0;
}

// This function returns an array containing the current draft order. ie the first
// item in the array is the currently drafting team, the second item is the next
// team to draft, etc.
export const orderedDraftIds = createSelector(drafts, teams, players, (drafts, teams, players) => {
  const teamsLength = teams.length;
  if(!teamsLength) {
    return [];
  }

  return players
    .map((player, index) => {
      const teamId = teams[getTeamIndexFromDraftIndex(index, teamsLength)].id;
      const round = getRoundFromDraftIndex(index, teamsLength);
      const startOfRound = isStartOfRoundFromDraftIndex(index, teamsLength);
      const draftNum = index + 1;
      return {teamId, round, startOfRound, draftNum}
    })
    .slice(drafts.length)
    .map((draft, index) => {
      const current = index === 0;
      const next = index === 1;
      return {...draft, current, next};
    });
});

export const nextDraft = createSelector(orderedDraftIds, (ids) => {
  const teamId = ids.length > 0 ? ids[0].teamId : -1;
  return {teamId}
});