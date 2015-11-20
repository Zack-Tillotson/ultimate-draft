import {createSelector} from 'reselect';
import {teams} from '../l1';

export const teamMap = createSelector(teams, (teams) => {
  const ret = {};
  teams.forEach(team => ret[team.id] = team);
  return ret;
});