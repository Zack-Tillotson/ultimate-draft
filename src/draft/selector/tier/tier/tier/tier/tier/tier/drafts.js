import {createSelector} from 'reselect';
import {drafts, baggageDrafts, playerMap, teamMap} from '../';

function addPAndT(drafts, playerMap, teamMap) {
  return drafts.map(draft => {
      const team = teamMap[draft.teamId];
      const player = playerMap[draft.playerId];
      return {...draft, team, player}
    });
}

export const draftsWithTeamsAndPlayers = createSelector(drafts, playerMap, teamMap, 
  (drafts, playerMap, teamMap) => {
    return addPAndT(drafts, playerMap, teamMap);
  }
);

export const baggageDraftsWithTeamsAndPlayers = createSelector(baggageDrafts, playerMap, teamMap, 
  (baggageDrafts, playerMap, teamMap) => {
    return addPAndT(baggageDrafts, playerMap, teamMap);
  }
);