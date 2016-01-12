import {createSelector} from 'reselect';
import {contextTeam, drafts, baggageDrafts, players, columns} from '../';
import utils from '../../../../../utils';

export const genderDrafts = createSelector(contextTeam, drafts, baggageDrafts, players, columns,
  (contextTeam, drafts, baggageDrafts, players, columns) => {
    let male = 0, female = 0;
    if(contextTeam !== null) {
      const teamIds = {};
      drafts
        .filter(draft => draft.teamId == contextTeam)
        .forEach(draft => {
          const player = players.find(player => utils.getPlayerId(player, columns) == draft.playerId);
          teamIds[draft.playerId] = utils.getGender(player, columns);
          const baggageId = utils.getBaggageId(player, columns);
          if(!!baggageId) {
            const baggage = players.find(
              baggage => utils.getPlayerId(baggage, columns) == utils.getBaggageId(player, columns)
            );
            teamIds[baggageId] = utils.getGender(baggage, columns);
          }
        });
      baggageDrafts
        .filter(draft => draft.teamId == contextTeam)
        .forEach(draft => {
          const player = players.find(player => utils.getPlayerId(player, columns) == draft.playerId);
          teamIds[draft.playerId] = utils.getGender(player, columns);
        });
      Object.keys(teamIds).forEach(id => {
        if(teamIds[id] == 'M') {
          male++;
        } else {
          female++;
        }
      });
    }
    return {male, female};
  }
);