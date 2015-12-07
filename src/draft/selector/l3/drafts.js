import {createSelector} from 'reselect';
import {orderedDraftIds, user} from '../l2';

export const draftIdsWithContext = createSelector(orderedDraftIds, user, 
  (drafts, user) => {
    return drafts.map(draft => {
      const contextActive = user.viewTeam == -1 || user.viewTeam == draft.teamId;
      return {...draft, contextActive};
    });
});