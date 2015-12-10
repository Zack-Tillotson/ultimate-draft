import {createSelector} from 'reselect';

import selectors from '../';

import {genderDrafts} from './user';

export default { ...selectors, genderDrafts};