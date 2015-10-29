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
import {ui, user, players, firebase, columns, teams, drafts} from './reducers';

export default combineReducers({ui, user, players, firebase, columns, teams, drafts});