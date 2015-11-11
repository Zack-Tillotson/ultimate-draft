import {createSelector} from 'reselect';
import ModalNames from '../modalNames';
import utils from '../utils';

import {players, ui, drafts, user, columns, firebase, teams} from './base';

const playersWithMeta = createSelector(
   players, drafts, user, columns, teams,
  (players, drafts, user, columns, teams) => {
    return players.map(player => {
      const draft = drafts.find(draft => draft.playerId == utils.getPlayerId(player, columns));
      const team = !draft ? null : teams.find(team => team.id == draft.teamId);
      const draftStatus = utils.getDraftStatus(user.viewTeam, player, players, drafts, columns);
      return {data: player, draftStatus, team};
    });
});

const soloPlayerMap = createSelector(playersWithMeta, columns, (players, columns) => {
  const idColumn = columns.find(column => column.type === 'ID');
  const ret = {};
  players.forEach(player => ret[utils.getPlayerId(player, columns)] = player);
  return ret;
});

const playersWithBaggage = createSelector(playersWithMeta, soloPlayerMap, columns, (players, playerMap, columns) => {
  return players.map(player => {
    const baggageId = utils.getBaggageId(player, columns);
    const baggage = baggageId ? playerMap[baggageId] : null;
    return {...player, baggage }
  });
});

const playerMap = createSelector(playersWithBaggage, columns, (players, columns) => {
  const idColumn = columns.find(column => column.type === 'ID');
  const ret = {};
  players.forEach(player => ret[utils.getPlayerId(player, columns)] = player);
  return ret;
});

export default {players: playersWithBaggage, playerMap};