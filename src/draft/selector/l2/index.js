// Tranformations using level 0 selectors only

import {createSelector} from 'reselect';

import l1 from '../l1';

import {teamMap} from './teams';
import {contextTeam} from './user';

export default { ...l1, teamMap, contextTeam };