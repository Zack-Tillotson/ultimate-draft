function transformColumns(columns) {
  return columns.map(column => {
    const {name, type} = column;
    return {name, type};
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

export default (state) => {

  const columns = state.getIn(
    ['objects', state.getIn(['wizard', 'CsvConfiguration']), 'columns']
  ).toJS();
  const players = state.getIn(
    ['objects', state.getIn(['wizard', 'DataEntry']), 'data']
  ).toJS();
  const teams = state.getIn(
    ['objects', state.getIn(['wizard', 'TeamConfiguration']), 'teams']
  ).toJS();

  const data = buildData(columns, players, teams);
  const shareLink = state.getIn('url') || '';
  
  return {columns, players, teams, data, shareLink};
} 