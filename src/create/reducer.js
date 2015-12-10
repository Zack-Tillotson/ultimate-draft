/* 

State: {
  draft: {
    name: string,
    url: string
  },
  players: [{
    id,
    baggage id,
    team: id team
    data: JSON of string from csv
  }],
  teams: [{
    name: string,
    color: '#abc123'
  }],
  wizard: {
    step: integer, 
    maxSteps: integer,
    forms: [{
      valid: boolean,
      inputs: {
        name, value, valid
      }
    }]
  }
}

*/

import {combineReducers} from 'redux';
import {draft, players, teams, columns, wizard, auth} from './reducers';

export default combineReducers({draft, players, teams, columns, wizard, auth});