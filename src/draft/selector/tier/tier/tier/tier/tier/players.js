import {createSelector} from 'reselect';
import utils from '../../../../../../utils';

import {players, drafts, columns, teams, contextTeam, genderDrafts, maxGenderDrafts} from '../';

const playersWithMeta = createSelector(
   players, drafts, contextTeam, columns, teams, genderDrafts, maxGenderDrafts,
  (players, drafts, contextTeam, columns, teams, genderDrafts, maxGenderDrafts) => {
    return players.map(player => {
      const draft = drafts.find(draft => draft.playerId == utils.getPlayerId(player, columns));
      const team = !draft ? null : teams.find(team => team.id == draft.teamId);
      const draftStatus = utils.getDraftStatus(contextTeam, player, players, drafts, columns, genderDrafts, maxGenderDrafts);
      return {data: player, draftStatus, team};
    });
});

const soloPlayerMap = createSelector(playersWithMeta, columns, (players, columns) => {
  const idColumn = columns.find(column => column.type === 'ID');
  const ret = {};
  players.forEach(player => ret[utils.getPlayerId(player, columns)] = player);
  return ret;
});

export const playersWithBaggage = createSelector(playersWithMeta, soloPlayerMap, columns, (players, playerMap, columns) => {
  return players.map(player => {
    const baggageId = utils.getBaggageId(player, columns);
    const baggage = baggageId ? playerMap[baggageId] : null;
    return {...player, baggage }
  });
});

export const playerMap = createSelector(playersWithBaggage, columns, (players, columns) => {
  const ret = {};
  players.forEach(player => ret[utils.getPlayerId(player, columns)] = player);
  return ret;
});