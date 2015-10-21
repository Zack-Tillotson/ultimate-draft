import { createStore, applyMiddleware, combineReducers } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import LoggerMiddleware from 'redux-logger';

import middleware from './middleware';

import reducer from './reducer';

const store = applyMiddleware(
  ...middleware,
  ThunkMiddleware,
  LoggerMiddleware({
    level: 'info',
    predicate: (state, action) => true,
    transformer: (state) => state.toJS()
  })
)(createStore)(reducer);

export default store;