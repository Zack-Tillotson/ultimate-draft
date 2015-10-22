import uuid from 'uuid';
import Immutable from 'immutable';
import actions from './actions';

import formReducer from './reducers/formReducer';

/* 

State: {
  draft: key,
  players: key array,
  teams: key array,
  wizard: key array,
  objects: {
    key: Object,
    ...
  }
}

Objects all have a guid key and a 'type' of [Draft, Player, Team] in addition to 
any other data they store.

Draft: {
  type, key,
  name: string
}

Player: {
  type, key,
  id: string if specified or integer,
  baggage key,
  isCaptain: boolean,
  team: key of team
  data: JSON of string from csv
}

Team: {
  type, key,
  name: string,
  color: '#abc123'
}

Form: {
  type, key,
  name: string,
  valid: boolean,
  inputs: {
    name, value, valid
  }
}

*/

function getInitialState() {
  
  return Immutable.fromJS({
    draft: 'draft',
    players: [],
    teams: [],
    wizard: {
      step: 0,
      totalSteps: 4
    },
    objects: {
      draft: {type: 'Draft', key: 'draft'}
    }
  });

}

function draftObjectReducer(draft, action) {
  return draft;
}

function draftReducer(state, action) {
  return state.updateIn('objects', 'draft', 
    draft => draftObjectReducer(draft, action)
  );
}

function playersReducer(state, action) {
  return state;
}

function teamsReducer(state, action) {
  return state;
}

function wizardReducer(state, action) {
  switch(action.type) {
    case actions.submitForm:

      const key = state.getIn(['wizard', action.formName]);
      const newFormObject = formReducer[action.formName](state.getIn('objects', key), action);

      state = state.setIn(['wizard', action.formName], newFormObject.get('key'));
      state = state.setIn(['objects', newFormObject.get('key')], newFormObject);
      state = state.updateIn(['wizard', 'step'], step => step + 1);

      break;
  }
  return state;
}

export default (state, action) => {
  const {type} = action;

  if(!state) {
    state = getInitialState();
  }

  state = draftReducer(state, action);  
  state = playersReducer(state, action);
  state = teamsReducer(state, action);
  state = wizardReducer(state, action);

  return state;
  
};