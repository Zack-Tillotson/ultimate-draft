import { createStore, applyMiddleware, combineReducers } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import LoggerMiddleware from 'redux-logger';

function objectToJs(state) {
  const keys = Object.keys(state);
  const ret = {};
  keys.forEach(key => 
    ret[key] = 
      key == 'local' ? state[key] :
      typeof state[key].toJS == 'function' ? state[key].toJS() : 
      objectToJs(state[key])
  );
  return ret;
}

const middleware = [ThunkMiddleware];

if(__DEBUG__) {
  middleware.push(LoggerMiddleware({
    level: 'info',
    predicate: (state, action) => true,
    transformer: objectToJs
  }));
}

export default function buildStore(reducer) {
  return applyMiddleware(...middleware)(createStore)(reducer);
}