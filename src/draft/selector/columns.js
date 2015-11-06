import {createSelector} from 'reselect';
import {team as teamColumn} from '../../columnTypes';
import user from './user';
import {columns} from './base';

function getTeamColumn() {
  const {name, summary, type} = teamColumn;
  return {name, summary, type, visible: true};
}

export default createSelector(user, columns, (user, columns) => {
  const cols = columns.map(column => {
    const userCol = user.columnFilters.find(userCol => userCol.name == column.name) || {};
    return {...column, ...userCol}
  });
  return [getTeamColumn(), ...cols];
});