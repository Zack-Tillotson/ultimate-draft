import Immutable from 'immutable';
import actions from '../../state/actions';

function getInitialState() {
  return  Immutable.fromJS([]);
}

export default function(state = getInitialState(), action) {
  switch(action.type) {
  }
  return state;
}