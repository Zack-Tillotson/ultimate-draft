import {createSelector} from 'reselect';
import {previousDrafts, orderedDraftIds, teamMap, nextDraft} from '../l2';

export const draftOrder = createSelector(previousDrafts, orderedDraftIds, teamMap, (prevDrafts, ids, teams) => {

  ids.forEach((draft, index) => {
    draft.current = index === 0;
    draft.next = index === 1;
  });

  return prevDrafts.concat(ids).map(draft => {
    const playerId = typeof draft.playerId === 'undefined' ? '' : draft.playerId;
    const team = teams[draft.teamId];
    return {...draft, team, playerId}
  });
});

export const statusWithDraftInfo = createSelector(draftOrder, nextDraft, (draftOrder, nextDraft) => {
  return {draftOrder, nextDraft};
});