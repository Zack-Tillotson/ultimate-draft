// Master selector - uses the top level selectors only

import {createSelector} from 'reselect';
import {
  user, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, firebase, statusWithDraftInfo
} from './l2';

export default createSelector(
  [user, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, firebase, statusWithDraftInfo],
  (user, ui, players, teams, columns, drafts, firebase, status) => {
  return {user, ui, players, teams, columns, drafts, firebase, status};
});