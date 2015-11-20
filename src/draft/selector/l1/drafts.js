import {createSelector} from 'reselect';
import {drafts, teams} from '../l0';

// Return an array of indices in a 'snake' ordering - up to down, then down to up, etc
function getSnakeTeamIndexes(teamCount, requestedSize = 10) {
  const ret = [];
  while(ret.length < requestedSize) {
    for(let i = 0 ; i < teamCount ; i++) ret.push(i);
    for(let i = 0 ; i < teamCount ; i++) ret.push(teamCount - 1 - i);
  }
  return ret;
}

export const orderedDraftIds = createSelector(drafts, teams, (drafts, teams) => {
  const teamsLength = teams.length;
  if(!teamsLength) {
    return [];
  }

  const orderSize = 10;
  const teamIds = getSnakeTeamIndexes(teamsLength, orderSize);
  const cyclcalIndex = drafts.length % (2 * teamsLength);

  return teamIds
    .slice(cyclcalIndex)
    .concat(teamIds.slice(0, cyclcalIndex))
    .slice(0, orderSize)
    .map(teamId => {
      return {teamId}
    });
});

export const nextDraft = createSelector(orderedDraftIds, (ids) => {
  const teamId = ids.length > 0 ? ids[0].teamId : -1;
  return {teamId}
});

export const previousDrafts = createSelector(drafts, (drafts) => {
  return drafts.slice(-2);
});