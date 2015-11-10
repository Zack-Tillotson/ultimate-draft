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
    const baggage = players
      .filter(player => player.baggage && !player.baggage.team)
      .map(player => player.baggage);
    return {...team, players, baggage};
  });
});

export default {teams: teamsWithPlayers, teamMap};