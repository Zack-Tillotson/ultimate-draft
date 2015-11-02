import {createSelector} from 'reselect';

import user from './user';
import {columns} from './base';

export default createSelector(user, columns, (user, columns) => {
  return columns.map(column => {
    const userCol = user.columnFilters.find(userCol => userCol.name == column.name) || {};
    return {...column, ...userCol}
  });
});