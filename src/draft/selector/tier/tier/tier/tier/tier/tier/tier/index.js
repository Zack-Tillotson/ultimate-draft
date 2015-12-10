// Tranformations using level 1 selectors only

import {createSelector} from 'reselect';

import selectors from '../';

import {userWithData} from './user';

export default {...selectors, userWithData};