import {createSelector} from 'reselect';
import {contextTeam, drafts, players, columns} from '../';
import utils from '../../../../../utils';

export const genderDrafts = createSelector(contextTeam, drafts, players, columns,
  (contextTeam, drafts, players, columns) => {
    let male = 0, female = 0;
    if(contextTeam) {
      drafts
        .filter(draft => draft.teamId == contextTeam)
        .forEach(draft => {
          const player = players.find(player => utils.getPlayerId(player, columns) == draft.playerId);
          if(utils.getGender(player, columns) == 'M') {
            male++;
          } else {
            female++;
          }
          if(utils.getBaggageId(player, columns)) {
            const baggage = players.find(
              baggage => utils.getPlayerId(baggage, columns) == utils.getBaggageId(player, columns)
            );
            if(utils.getGender(baggage, columns) == 'M') {
              male++;
            } else {
              female++;
            } 
          }
        });
  }
  return {male, female};
});