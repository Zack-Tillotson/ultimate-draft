// Master selector - uses the top level selectors only

import {createSelector} from 'reselect';
import {
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, baggageDraftsWithTeamsAndPlayers, firebase, statusWithDraftInfo, draftMeta, auth,
} from './tier/tier/tier/tier/tier/tier/tier/';

const metaSelector = createSelector(
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, baggageDraftsWithTeamsAndPlayers, firebase, statusWithDraftInfo, draftMeta, auth,
  (user, ui, players, teams, columns, drafts, baggageDrafts, firebase, status, draftMeta, auth) => {
  return {user, ui, players, teams, columns, drafts, baggageDrafts, firebase, status, draftMeta, auth};
});

export default (state) => {
  const startTime = Date.now();
  const result = metaSelector(state);
  const endTime = Date.now();
  console.log("Selector complete in " + (parseInt(endTime - startTime) / 10) / 100 + ' seconds');
  return result;
}