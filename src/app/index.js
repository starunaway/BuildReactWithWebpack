import React from 'react';
import ReactDom from 'react-dom';
import * as Routers from 'react-router-dom';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history';
import create from '../redux/core';
import {isFunction, isHTMLElement, isString} from './utils';

function App(opts = {}) {
  const {onEffect, onFetchOption, onReducer} = opts;
  const history = opts.history || createHashHistory();
  const createOpts = {
    setupApp: function (app) {
      app._history = patchHistory(history);
    },
    onEffect,
    onFetchOption,
    onReducer,
    history,
  };

  const app = create(createOpts);
  const oldAppStart = app.start;
  app.router = router;
  app.start = start;
  return app;

  function start(container) {
    if (isString(container)) {
      container = document.querySelector(container);
    }

    if (!isHTMLElement(container)) {
      throw new Error('app.start 应该是 HTMLElement 元素');
    }
    if (!app._store) {
      oldAppStart(app);
    }

    const store = app._store;
    if (container) {
      render(container, store, app);
    } else {
      return getProvider(store, this);
    }
  }

  function router(router) {
    app._router = router;
  }
}

function getProvider(store, app) {
  return <Provider store={store}>{app._router(app, Routers)}</Provider>;
}

function render(container, store, app) {
  ReactDOM.render(getProvider(store, app), container);
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
