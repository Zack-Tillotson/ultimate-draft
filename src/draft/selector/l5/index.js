// Tranformations using level 1 selectors only

import {createSelector} from 'reselect';

import l4 from '../l4';

import {userWithData} from './user';

export default {...l4, userWithData};