import {createSelector} from 'reselect';

import {user, teamsWithPlayersMap, nextDraft} from '../l4';

export const userWithData = createSelector(user, teamsWithPlayersMap, nextDraft, 
  (user, teamMap, nextDraft) => {
    const team = user.viewTeam >= 0 ? teamMap[user.viewTeam] 
      : (nextDraft && nextDraft.teamId >= 0) ? teamMap[nextDraft.teamId]
      : null;
    return {...user, team}
});