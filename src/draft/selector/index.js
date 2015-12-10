// Master selector - uses the top level selectors only

import {createSelector} from 'reselect';
import {
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, firebase, statusWithDraftInfo
} from './tier/tier/tier/tier/tier/tier/tier/';

export default createSelector(
  [userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, firebase, statusWithDraftInfo],
  (user, ui, players, teams, columns, drafts, firebase, status) => {
  return {user, ui, players, teams, columns, drafts, firebase, status};
});