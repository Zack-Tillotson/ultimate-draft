import {createSelector} from 'reselect';

const ui = state => state.ui.toJS();
const players = state => state.players.toJS();
const teams = state => state.teams.toJS();
const columns = state => state.columns.toJS();
const firebase = state => state.firebase.toJS();


export default createSelector(
  [ui, players, teams, columns, firebase],
  (ui, players, teams, columns, firebase) => {
  return {ui, players, teams, columns, firebase};
})