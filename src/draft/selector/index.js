// Master selector - uses the top level selectors only

import {createSelector} from 'reselect';
import {
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, 
  baggageDraftsWithTeamsAndPlayers, firebase, statusWithDraftInfo, auth,
} from './tier/tier/tier/tier/tier/tier/tier/';
import firebaseMetaSelector from '../../firebase/selectors';

const metaSelector = createSelector(
  userWithData, uiWithData, playersWithBaggage, teamsWithPlayers, fullColumns, draftsWithTeamsAndPlayers, 
  baggageDraftsWithTeamsAndPlayers, firebase, statusWithDraftInfo, auth,
  (user, ui, players, teams, columns, drafts, baggageDrafts, firebase, status, auth) => {
  return {user, ui, players, teams, columns, drafts, baggageDrafts, firebase, status, auth};
});

export default (state) => {

  const startTime = Date.now();

  const mainResult = metaSelector(state);
  const firebaseMeta = firebaseMetaSelector(state.firebase);

  const endTime = Date.now();
  console.log("Selector complete in " + (parseInt(endTime - startTime) / 10) / 100 + ' seconds');

  return {...mainResult, firebaseMeta};
}