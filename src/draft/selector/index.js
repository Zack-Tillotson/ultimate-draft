// Master selector - uses the top level selectors only

import {createSelector} from 'reselect';
import firebaseMetaSelector from '../../firebase/selectors';

import {
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, 
  baggageDraftsWithTeamsAndPlayers, connection, statusWithDraftInfo, auth, draft, draftMeta, userData, localDataCleanSorts
} from './tier/tier/tier/tier/tier/tier/tier/';

const metaSelector = createSelector(
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, 
  baggageDraftsWithTeamsAndPlayers, connection, statusWithDraftInfo, auth, draft, draftMeta, userData, localDataCleanSorts,
  (user, ui, players, teams, columns, drafts, baggageDrafts, connection, status, auth, draft, draftMeta, userData, local) => {
  return {user, ui, players, teams, columns, drafts, baggageDrafts, connection, status, auth, draft, draftMeta, userData, local};
});

export default (state) => {

  const startTime = Date.now();

  const mainResult = metaSelector(state);
  const firebaseMeta = firebaseMetaSelector(state.firebase);

  const endTime = Date.now();
  
  return {...mainResult, firebaseMeta};
}