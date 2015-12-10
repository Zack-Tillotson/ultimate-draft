import {createSelector} from 'reselect';
import {teams} from '../';

export const teamMap = createSelector(teams, (teams) => {
  const ret = {};
  teams.forEach(team => ret[team.id] = team);
  return ret;
});