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
import user from './user';
import connection from './connection';
import {draft} from '../../firebase/reducers';

export default combineReducers({ui, user, connection, firebase: draft});