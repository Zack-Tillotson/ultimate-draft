// Tranformations using level 1 selectors only

import {createSelector} from 'reselect';

import l2 from '../l2';
import {playersWithBaggage, playerMap} from './players';


export default { ...l2, playersWithBaggage, playerMap };