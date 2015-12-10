import {createSelector} from 'reselect';

import {team as teamColumn} from '../../../../columnTypes';
import {user, columns} from '../';

// Creates the "team" column which is a basic column type we add showing which team has drafted the player
function getTeamColumn() {
  const {name, summary, type} = teamColumn;
  return {name, summary, type, visible: true};
}

// Adds 'team' column and merges user column preferences
export const fullColumns = createSelector(user, columns, (user, columns) => {
  const cols = columns.map(column => {
    const userCol = user.columnFilters.find(userCol => userCol.name == column.name) || {};
    return {...column, ...userCol}
  });
  return [getTeamColumn(), ...cols];
});