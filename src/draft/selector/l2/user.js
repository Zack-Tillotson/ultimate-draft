import {createSelector} from 'reselect';

import {user, nextDraft} from '../l1';

export const contextTeam = createSelector(user, nextDraft, (user, nextDraft) => {
    return user.viewTeam >= 0 ? user.viewTeam
      : (nextDraft && nextDraft.teamId >= 0) ? nextDraft.teamId
      : null;
});