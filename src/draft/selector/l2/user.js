import {createSelector} from 'reselect';

import {user, teamMap, nextDraft} from '../l1';

export const userWithData = createSelector(user, teamMap, nextDraft, (user, teamMap, nextDraft) => {
  const team = user.viewTeam >= 0 ? teamMap[user.viewTeam] 
    : (nextDraft && nextDraft.teamId >= 0) ? teamMap[nextDraft.teamId]
    : null;
  return {...user, team}
});