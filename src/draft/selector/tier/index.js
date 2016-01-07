// Direct conversion from state

import {createSelector} from 'reselect';

const userIm = state => state.user;
const uiIm = state => state.ui;
const connectionIm = state => state.connection;
const firebaseIm = state => state.firebase;

const user = createSelector(userIm, user => user.toJS());
const ui = createSelector(uiIm, ui => ui.toJS());
const connection = createSelector(connectionIm, connection => connection.toJS());
const players = createSelector(firebaseIm, firebaseIm => firebaseIm.players.toJS());
const teams = createSelector(firebaseIm, firebaseIm => firebaseIm.teams.toJS().filter(team => !!team));
const columns = createSelector(firebaseIm, firebaseIm => firebaseIm.columns.toJS());
const drafts = createSelector(firebaseIm, firebaseIm => firebaseIm.drafts.toJS().filter(draft => !draft.type));
const baggageDrafts = createSelector(firebaseIm, firebaseIm => firebaseIm.drafts.toJS().filter(draft => draft.type == 'baggage'));
const draftMeta = createSelector(firebaseIm, firebaseIm => firebaseIm.draftMeta.toJS());
const draft = createSelector(firebaseIm, firebaseIm => firebaseIm.draft.toJS());
const auth = createSelector(firebaseIm, firebaseIm => firebaseIm.auth.toJS());

export default {user, ui, players, teams, columns, drafts, baggageDrafts, connection, draft, draftMeta, auth};