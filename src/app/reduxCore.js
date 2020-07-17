// import createSagaMiddleware from 'redux-saga';
import {reducerBuilder} from './reducerBuilder';
// import {sagaBuilder} from './sagaBuilder';
import {Base64} from 'js-base64';
import 'react-redux';

import {applyMiddleware, compose, createStore} from 'redux';

// const cSagaMiddleware = createSagaMiddleware.default || createSagaMiddleware;

export default function create(createOpts = {}) {
  const {setupApp, onError: onErr, onEffect, onFetchOption, onReducer, history} = createOpts;
  const app = {
    _models: [],
    model,
    models,
    reducerMiddleware,
    start,
  };

  return app;

  function model(model) {
    app._models.push(model);
  }

  function models(models) {
    app._models = [...app._models, ...models];
  }

  function reducerMiddleware(middleware) {
    app._reducerMiddleware = middleware;
  }

  function start(app) {
    // const sagaMiddleware = cSagaMiddleware();
    let initialState = {};
    if (window.__INITIAL_STATE__) {
      try {
        initialState = JSON.parse(Base64.decode(window.__INITIAL_STATE__)) || {};
      } catch (e) {
        console.log('window initial state error:', e);
      }
    }

    const store = createReduxStore({
      reducers: reducerBuilder(app._models, onReducer),
      initialState,
      //   sagaMiddleware,
    });

    app._store = store;
    // store.runSaga = sagaMiddleware.run;
    // const sagas = sagaBuilder(app._models, {onEffect, onFetchOption, history});
    // sagaMiddleware.run(sagas);
    setupApp(app);
  }
}

function createReduxStore(opts = {}) {
  const {
    reducers,
    initialState,
    //  sagaMiddleware
  } = opts;

  let devtools = () => (noop) => noop;

  if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__;
  }

  //   const middlewares = [sagaMiddleware];
  const middlewares = [];

  const enhancers = [applyMiddleware(...middlewares), devtools(window.__REDUX_DEVTOOLS_EXTENSION__OPTIONS)];
  return createStore(reducers, initialState, compose(...enhancers));
}
