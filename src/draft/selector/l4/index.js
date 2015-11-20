// Tranformations using level 1 selectors only

import {createSelector} from 'reselect';

import l3 from '../l3';

import {userWithData} from './user';

export default {...l3, userWithData};