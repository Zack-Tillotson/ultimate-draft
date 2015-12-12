// Direct conversion from state

import {createSelector} from 'reselect';

const userIm = state => state.user;
const uiIm = state => state.ui;
const playersIm = state => state.players;
const teamsIm = state => state.teams;
const columnsIm = state => state.columns;
const draftsIm = state => state.drafts;
const firebaseIm = state => state.firebase;
const draftIm = state => state.draft;
const authIm = state => state.auth;

const user = createSelector(userIm, user => user.toJS());
const ui = createSelector(uiIm, ui => ui.toJS());
const players = createSelector(playersIm, players => players.toJS());
const teams = createSelector(teamsIm, teams => teams.toJS());
const columns = createSelector(columnsIm, columns => columns.toJS());
const drafts = createSelector(draftsIm, drafts => drafts.toJS().filter(draft => !draft.type));
const baggageDrafts = createSelector(draftsIm, drafts => drafts.toJS().filter(draft => draft.type == 'baggage'));
const firebase = createSelector(firebaseIm, firebase => firebase.toJS());
const draft = createSelector(draftIm, draft => draft.toJS());
const auth = createSelector(authIm, auth => auth.toJS());

export default {user, ui, players, teams, columns, drafts, baggageDrafts, firebase, draft, auth};