import {combineReducers} from 'redux';

import draft from './draft';
import players from './players';
import teams from './teams';
import wizard from './wizard';
import columns from './columns';
import {create as firebase} from '../../firebase/reducers';

export default {draft, players, teams, wizard, columns, firebase};