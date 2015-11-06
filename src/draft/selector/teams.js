import {createSelector} from 'reselect';
import {teams, drafts} from './base';
import {playerMap} from './players';

const teamMap = createSelector(teams, (teams) => {
  const ret = {};
  teams.forEach(team => ret[team.id] = team);
  return ret;
});

const teamsWithPlayers = createSelector(playerMap, teams, drafts, (playerMap, teams, drafts) => {
  return teams.map(team => {
    const players = drafts
      .filter(draft => draft.teamId == team.id)
      .map(draft => playerMap[draft.playerId]);
    return {...team, players: players};
  });
});

export default {teams: teamsWithPlayers, teamMap};