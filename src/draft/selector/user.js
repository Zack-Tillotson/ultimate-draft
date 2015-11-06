import {createSelector} from 'reselect';

import {user} from './base';
import {teams} from './teams';

const teamMap = createSelector(teams, (teams) => {
  const ret = {};
  teams.forEach(team => ret[team.id] = team);
  return ret;
});

const userWithData = createSelector(user, teamMap, (user, teamMap) => {
  const team = user.viewTeam >= 0 ? teamMap[user.viewTeam] : null;
  return {...user, team}
});

export default userWithData;