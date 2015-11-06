import {createSelector} from 'reselect';
import ModalNames from '../modalNames';
import utils from '../utils';

import {players, ui, drafts, columns, firebase, user} from './base';

const playersWithMeta = createSelector(
   players, drafts, user, columns,
  (players, drafts, user, columns) => {
    return players.map(player => {
      const draftStatus = utils.getDraftStatus(user.currentTeam, player, players, drafts, columns);
      return {data: player, draftStatus};
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