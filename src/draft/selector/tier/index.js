// Direct conversion from state

import {createSelector} from 'reselect';

const userIm = state => state.user;
const uiIm = state => state.ui;
const connectionIm = state => state.connection;
const firebaseIm = state => state.firebase;

const user = createSelector(userIm, user => user.toJS());
const ui = createSelector(uiIm, ui => ui.toJS());
const firebase = createSelector(connectionIm, firebase => firebase.toJS());
const players = createSelector(firebaseIm, firebaseIm => firebaseIm.players.toJS());
const teams = createSelector(firebaseIm, firebaseIm => firebaseIm.teams.toJS());
const columns = createSelector(firebaseIm, firebaseIm => firebaseIm.columns.toJS());
const drafts = createSelector(firebaseIm, firebaseIm => firebaseIm.drafts.toJS().filter(draft => !draft.type));
const baggageDrafts = createSelector(firebaseIm, firebaseIm => firebaseIm.drafts.toJS().filter(draft => draft.type == 'baggage'));
const draft = createSelector(firebaseIm, firebaseIm => firebaseIm.draftMeta.toJS());
const auth = createSelector(firebaseIm, firebaseIm => firebaseIm.auth.toJS());

export default {user, ui, players, teams, columns, drafts, baggageDrafts, firebase, draft, auth};