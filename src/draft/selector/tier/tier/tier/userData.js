import {createSelector} from 'reselect';
import {local, fullColumns} from '../';

export const localDataCleanSorts = createSelector(local, fullColumns, (localData, columns) => {
  const sorts = (localData.playerSorts || [])
  return {sorts};
});