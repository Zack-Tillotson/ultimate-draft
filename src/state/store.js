import { createStore, applyMiddleware, combineReducers } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import LoggerMiddleware from 'redux-logger';

export default function buildStore(reducer) {
  return applyMiddleware(
    ThunkMiddleware,
    LoggerMiddleware({
      level: 'info',
      predicate: (state, action) => true,
      transformer: (state) => {
        const keys = Object.keys(state);
        const ret = {};
        keys.forEach(key => ret[key] = state[key].toJS());
        return ret;
      }
    })
  )(createStore)(reducer);
}
