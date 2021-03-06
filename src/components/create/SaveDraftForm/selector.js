import {createSelector} from 'reselect';

const name = (state, props) => props.name;
const wizard = (state) => state.wizard;
const forms = createSelector(wizard, (wizard) => wizard.get('forms'));
const form = createSelector(name, forms, (name, forms) => 
  forms.filter(form => form.get('name') === name).get(0).toJS()
);

function transformColumns(columns) {
  return columns
    .filter(column => column.include)
    .map(column => {
      const {name, type, visible, summary} = column;
      return {name, type, visible, summary};
    });
}

function transformPlayers(players, columns) {
  return players.map(player => {
    const ret = {};
    columns.forEach(column => {
      ret[column.name] = player[column.originalName];
    });
    return ret;
  });
}

function buildData(columns, players, teams) {
  return {
    columns: transformColumns(columns),
    players: transformPlayers(players, columns),
    teams
  }
}

const columns = state => state.columns;
const players = state => state.players;
const teams = state => state.teams;
const draft = state => state.draft;

export default createSelector(draft, columns, players, teams, (draft, columns, players, teams) => {

  draft = draft.toJS();
  columns = columns.toJS();
  players = players.toJS();
  teams = teams.toJS();

  const data = buildData(columns, players, teams);

  return {...data, draft};
});