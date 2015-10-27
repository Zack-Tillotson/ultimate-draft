import Immutable from 'immutable';
import actions from '../../state/actions';

export function getInitialState(name) {
  return {
    name,
    valid: false,
    inputs: {}
  };
}

export default function(state, action) {
  switch(action.type) {
  }
  return state;
}