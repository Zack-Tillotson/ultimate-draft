/* 

State: {
  ui: {
    tab: string,
    modal: string
  },
  players: [{player list from firebase}],
  teams: [{team list from firebase}],
  columns: [{column list from firebase}]
}

*/

import {combineReducers} from 'redux';

import ui from './ui';
import players from './players';
import firebase from './firebase';
import teams from './teams';
import columns from './columns';
import drafts from './drafts';
import user from './user';

export default combineReducers({ui, user, players, firebase, columns, teams, drafts});