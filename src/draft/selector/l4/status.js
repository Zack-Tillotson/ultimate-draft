import {createSelector} from 'reselect';
import {draftIdsWithContext, teamMap, nextDraft, players} from '../l3';

const draftCount = createSelector(players, (players) => {
  return players.length;
});

export const draftOrder = createSelector(draftIdsWithContext, teamMap, (drafts, teams) => {
  return drafts.map(draft => {
    const team = teams[draft.teamId];
    return {...draft, team};
  });
});

export const statusWithDraftInfo = createSelector(draftOrder, nextDraft, draftCount,
  (draftOrder, nextDraft, draftCount) => {
  return {draftOrder, nextDraft, draftCount};
});