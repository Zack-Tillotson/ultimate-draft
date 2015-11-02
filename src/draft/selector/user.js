import {createSelector} from 'reselect';

import {user, teams} from './base';

const teamMap = createSelector(teams, (teams) => {
  const ret = {};
  teams.forEach(team => ret[team.id] = team);
  return ret;
});

const userWithData = createSelector(user, teamMap, (user, teamMap) => {
  const team = user.currentTeam >= 0 ? teamMap[user.currentTeam] : null;
  return {...user, team}
});

export default userWithData;