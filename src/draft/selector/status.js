import {createSelector} from 'reselect';
import {teamMap} from './teams';
import drafts from './drafts';

function getSnakeTeamIndexes(teamCount) {
  const ret = [];
  for(let i = 0 ; i < teamCount ; i++) ret.push(i);
  for(let i = 0 ; i < teamCount ; i++) ret.push(teamCount - 1 - i);
  return ret;
}

const orderedDraftIds = createSelector(drafts, teamMap, (drafts, teamMap) => {
  const teamsLength = Object.keys(teamMap).length;
  if(!teamsLength) {
    return [];
  }
  const teamIds = getSnakeTeamIndexes(teamsLength);
  const cyclcalIndex = drafts.length % (2 * teamsLength);
  return teamIds
    .slice(cyclcalIndex)
    .concat(teamIds.slice(0, cyclcalIndex))
    .slice(0, 7)
    .map(teamId => {
      return {teamId}
    });
});

const emptyDrafts = [0,1,2].map(key => {
  return {teamId: -1};
})

const previousDrafts = createSelector(drafts, (drafts) => {
  return emptyDrafts.concat(drafts).slice(-3);
});

const draftOrder = createSelector(previousDrafts, orderedDraftIds, teamMap, (prevDrafts, drafts, teams) => {

  drafts.forEach((draft, index) => {
    draft.current = index === 0;
    draft.next = index === 1;
  });

  return prevDrafts.concat(drafts).map(draft => {
    const playerId = typeof draft.playerId === 'undefined' ? '' : draft.playerId;
    const team = teams[draft.teamId];
    return {...draft, team, playerId}
  });
});

export default createSelector(draftOrder, (draftOrder) => {
  return {draftOrder};
});