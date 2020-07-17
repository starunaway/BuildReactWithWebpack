import {createHashHistory} from 'history';
import React from 'react';
import createStore from './reduxCore';
import * as Type from '@utils/isType';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

class App {
  constructor(opts) {
    // const history = opts.history || createHashHistory();
    this._models = [];
    // this._history = patchHistory(history);
  }

  setRouter = (router) => {
    console.log('router', router);
    this._router = router;
  };
  setModels = (models) => {
    console.log('models');
    this._models = [...this._models, ...models];
  };
  start = (container) => {
    console.log('start');
    if (Type.isString(container)) {
      container = document.querySelector(container);
    }

    if (!Type.isHTMLElement(container)) {
      throw new Error('container 应该是 HTMLElement 元素');
    }

    if (!this._store) {
      this._store = createStore(this._models);
    }

    if (container) {
      this.render(container);
    } else {
      return this.getProvider();
    }
  };

  render = (container) => {
    ReactDom.render(this.getProvider(), container);
  };

  getProvider = () => {
    return <Provider store={this._store}>{this._router()}</Provider>;
  };
}

export default App;
