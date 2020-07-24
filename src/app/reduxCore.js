import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import createReducers from './createReducers';

export default function (models) {
  let reducerObj = createReducers(models);
  let reducer = combineReducers(reducerObj);

  return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
}
