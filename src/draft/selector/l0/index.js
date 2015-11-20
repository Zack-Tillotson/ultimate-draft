// Direct conversion from state

import {createSelector} from 'reselect';

const userIm = state => state.user;
const uiIm = state => state.ui;
const playersIm = state => state.players;
const teamsIm = state => state.teams;
const columnsIm = state => state.columns;
const draftsIm = state => state.drafts;
const firebaseIm = state => state.firebase;

export const user = createSelector(userIm, user => user.toJS());
export const ui = createSelector(uiIm, ui => ui.toJS());
export const players = createSelector(playersIm, players => players.toJS());
export const teams = createSelector(teamsIm, teams => teams.toJS());
export const columns = createSelector(columnsIm, columns => columns.toJS());
export const drafts = createSelector(draftsIm, drafts => drafts.toJS());
export const firebase = createSelector(firebaseIm, firebase => firebase.toJS());