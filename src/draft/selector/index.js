// Master selector - uses the top level selectors only

import {createSelector} from 'reselect';
import {
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, 
  baggageDraftsWithTeamsAndPlayers, connection, statusWithDraftInfo, auth, draft, draftMeta, userData
} from './tier/tier/tier/tier/tier/tier/tier/';
import firebaseMetaSelector from '../../firebase/selectors';

const metaSelector = createSelector(
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, 
  baggageDraftsWithTeamsAndPlayers, connection, statusWithDraftInfo, auth, draft, draftMeta, userData,
  (user, ui, players, teams, columns, drafts, baggageDrafts, connection, status, auth, draft, draftMeta, userData) => {
  return {user, ui, players, teams, columns, drafts, baggageDrafts, connection, status, auth, draft, draftMeta, userData};
});

export default (state) => {

  const startTime = Date.now();

  const mainResult = metaSelector(state);
  const firebaseMeta = firebaseMetaSelector(state.firebase);

  const endTime = Date.now();
  
  return {...mainResult, firebaseMeta};
}