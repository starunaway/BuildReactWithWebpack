import React from 'react';
import ReactDom from 'react-dom';
import * as Routers from 'react-router-dom';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history';
import {reducerBuilder} from './reducerBuilder';
import {Base64} from 'js-base64';
import createReduxStore from './reduxCore';
import {isFunction, isHTMLElement, isString} from './utils';

function App(opts = {}) {
  const {onEffect, onFetchOption, onReducer} = opts;
  const history = opts.history || createHashHistory();

  const app = {
    _models: [],
    _history: patchHistory(history),
    model,
    models,
    reducerMiddleware,
    start,
    router,
  };

  return app;

  function start(container) {
    if (isString(container)) {
      container = document.querySelector(container);
    }

    if (!isHTMLElement(container)) {
      throw new Error('app.start 应该是 HTMLElement 元素');
    }
    if (!app._store) {
      createStore(app);
    }

    const store = app._store;
    if (container) {
      render(container, store, app);
    } else {
      return getProvider(store, this);
    }
  }

  function createStore(app) {
    // const sagaMiddleware = cSagaMiddleware();
    let initialState = {};
    if (window.__INITIAL_STATE__) {
      try {
        initialState = JSON.parse(Base64.decode(window.__INITIAL_STATE__)) || {};
      } catch (e) {
        console.log('window initial state error:', e);
      }
    }

    console.log('createStore', initialState, app);
    const reducers = reducerBuilder(app._models, onReducer);
    const store = createReduxStore({
      reducers,
      initialState,
      //   sagaMiddleware,
    });

    app._store = store;
    // store.runSaga = sagaMiddleware.run;
    // const sagas = sagaBuilder(app._models, {onEffect, onFetchOption, history});
    // sagaMiddleware.run(sagas);
  }

  function router(router) {
    app._router = router;
  }

  function model(model) {
    app._models.push(model);
  }

  function models(models) {
    app._models = [...app._models, ...models];
  }

  function reducerMiddleware(middleware) {
    app._reducerMiddleware = middleware;
  }
}

function getProvider(store, app) {
  return <Provider store={store}>{app._router(app, Routers)}</Provider>;
}

function render(container, store, app) {
  ReactDom.render(getProvider(store, app), container);
}

function patchHistory(history) {
  const oldListen = history.listen;
  history.listen = (callback) => {
    callback(history.location);
    return oldListen.call(history, callback);
  };
  return history;
}

export default App;
