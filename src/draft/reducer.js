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
import {ui, players, firebase, columns, teams} from './reducers';

export default combineReducers({ui, players, firebase, columns, teams});