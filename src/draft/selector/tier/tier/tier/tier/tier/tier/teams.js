import {createSelector} from 'reselect';
import {playerMap, teams, drafts, baggageDrafts, columns} from '../';
import utils from '../../../../../../../utils';

export const teamsWithPlayers = createSelector(playerMap, teams, drafts, baggageDrafts, columns, 
  (playerMap, teams, drafts, baggageDrafts, columns) => {
  return teams.map(team => {
    const players = drafts
      .filter(draft => draft.teamId == team.id)
      .map(draft => playerMap[draft.playerId]);
    const directBaggage = players
      .filter(player => player.baggage && !player.baggage.team)
      .map(player => player.baggage);
    const extraBaggage = baggageDrafts
      .filter(draft => draft.teamId == team.id)
      .filter(draft => !players.find(player => utils.getPlayerId(player, columns) == draft.playerId))
      .filter(draft => !directBaggage.find(player => utils.getPlayerId(player, columns) == draft.playerId))
      .map(draft => playerMap[draft.playerId]);
    const baggage = directBaggage.concat(extraBaggage);
    return {...team, players, baggage};
  });
});

export const teamsWithPlayersMap = createSelector(teamsWithPlayers, (teams) => {
  const ret = {};
  teams.forEach(team => ret[team.id] = team);
  return ret;
});