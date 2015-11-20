// Tranformations using level 0 selectors only

import {createSelector} from 'reselect';

import l1 from '../l1';

import {playersWithBaggage, playerMap} from './players';
import {teamMap} from './teams';

export default { ...l1, playersWithBaggage, playerMap, teamMap };