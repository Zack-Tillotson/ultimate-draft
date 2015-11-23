// Master selector - uses the top level selectors only

import {createSelector} from 'reselect';
import {
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, firebase, statusWithDraftInfo
} from './l5';

export default createSelector(
  [userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, firebase, statusWithDraftInfo],
  (user, ui, players, teams, columns, drafts, firebase, status) => {
  return {user, ui, players, teams, columns, drafts, firebase, status};
});