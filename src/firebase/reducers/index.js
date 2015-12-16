import {combineReducers} from 'redux';

import auth from './auth';

import draftMetas from './draftMetas';

import players from './players';
import teams from './teams';
import columns from './columns';
import drafts from './drafts';
import draftMeta from './draftMeta';

export const home = combineReducers({auth, draftMetas});
export const create = combineReducers({auth});
export const draft = combineReducers({auth, players, teams, columns, drafts, draftMeta});