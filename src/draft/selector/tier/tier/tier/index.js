// Tranformations using level 0 selectors only

import {createSelector} from 'reselect';

import selectors from '../';

import {teamMap} from './teams';
import {contextTeam} from './user';

export default { ...selectors, teamMap, contextTeam };