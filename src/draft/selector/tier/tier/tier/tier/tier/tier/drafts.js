import {createSelector} from 'reselect';
import {drafts, playerMap, teamMap} from '../';

export const draftsWithTeamsAndPlayers = createSelector(drafts, playerMap, teamMap, 
  (drafts, playerMap, teamMap) => {
    return drafts.map(draft => {
      const team = teamMap[draft.teamId];
      const player = playerMap[draft.playerId];
      return {...draft, team, player}
    })
});