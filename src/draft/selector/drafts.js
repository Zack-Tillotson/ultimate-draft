import {createSelector} from 'reselect';
import {ui, drafts, firebase} from './base';
import {playerMap} from './players';
import {teamMap} from './teams';
import user from './user';
import columns from './columns';

const draftsWithTeamsAndPlayers = createSelector(drafts, playerMap, teamMap, (drafts, playerMap, teamMap) => {
  return drafts.map(draft => {
    const team = teamMap[draft.teamId];
    const player = playerMap[draft.playerId];
    return {...draft, team, player}
  })
});

export default draftsWithTeamsAndPlayers;