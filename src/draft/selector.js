import {createSelector} from 'reselect';

const ui = state => state.ui;
const players = state => state.players;
const teams = state => state.teams;
const columns = state => state.columns;
const firebase = state => state.firebase;

const uiJs = createSelector(ui, ui => ui.toJS());
const playersJs = createSelector(players, players => players.toJS());
const teamsJs = createSelector(teams, teams => teams.toJS());
const columnsJs = createSelector(columns, columns => columns.toJS());
const firebaseJs = createSelector(firebase, firebase => firebase.toJS());

export default createSelector(
  [uiJs, playersJs, teamsJs, columnsJs, firebaseJs],
  (ui, players, teams, columns, firebase) => {
  return {ui, players, teams, columns, firebase};
});