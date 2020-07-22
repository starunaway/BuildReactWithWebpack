import {createStore, combineReducers, applyMiddleware} from 'redux';
// import {createStore, combineReducers} from './redux';

import {composeWithDevTools} from 'redux-devtools-extension';
// import reducer from './reducer';

import createReducers from './createReducers';

export default function (models) {
  let reducerObj = createReducers(models);
  let reducer = combineReducers(reducerObj);

  return createStore(reducer, composeWithDevTools());
}
