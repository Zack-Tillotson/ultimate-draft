import {createSelector} from 'reselect';
import {teams} from './base';
import drafts from './drafts';

function getSnakeTeamIndexes(teamCount) {
  const ret = [];
  for(let i = 0 ; i < teamCount ; i++) ret.push(i);
  for(let i = 0 ; i < teamCount ; i++) ret.push(teamCount - 1 - i);
  return ret;
}

const orderedDraftIds = createSelector(drafts, teams, (drafts, teams) => {
  if(!teams.length) {
    return [];
  }
  const teamIds = getSnakeTeamIndexes(teams.length);
  const cyclcalIndex = drafts.length % (2 * teams.length);
  return teamIds.slice(cyclcalIndex).concat(teamIds.slice(0, cyclcalIndex));
});

const draftOrder = createSelector(orderedDraftIds, teams, (drafts, teams) => {
  return drafts.map(id => teams[id]);
});

export default createSelector(draftOrder, (draftOrder) => {
  return {draftOrder};
});