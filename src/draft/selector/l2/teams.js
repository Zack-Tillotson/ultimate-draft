import {createSelector} from 'reselect';
import {playerMap, teams, drafts} from '../l1';

export const teamsWithPlayers = createSelector(playerMap, teams, drafts, (playerMap, teams, drafts) => {
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