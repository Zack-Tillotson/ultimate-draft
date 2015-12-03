import {createSelector} from 'reselect';
import {orderedDraftIds, teamMap, nextDraft, players} from '../l3';

const draftCount = createSelector(players, (players) => {
  return players.length;
});

export const draftOrder = createSelector(orderedDraftIds, teamMap, (drafts, teams) => {
  return drafts.map(draft => {
    const team = teams[draft.teamId];
    return {...draft, team};
  });
});

export const statusWithDraftInfo = createSelector(draftOrder, nextDraft, draftCount,
  (draftOrder, nextDraft, draftCount) => {
  return {draftOrder, nextDraft, draftCount};
});