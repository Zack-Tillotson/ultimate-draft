import { createStore, applyMiddleware, combineReducers } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import LoggerMiddleware from 'redux-logger';

export default function buildStore(reducer) {
  return applyMiddleware(
    ThunkMiddleware,
    LoggerMiddleware({
      level: 'info',
      predicate: (state, action) => true,
      transformer: (state) => state.toJS()
    })
  )(createStore)(reducer);
}
