import init from '@utils/instance';

const _action = init();

class Action {
  constructor({dispatch, history}) {
    const instacnce = _action();
    if (instacnce) {
      return instacnce;
    }
    this._dispatch = dispatch;
    this._history = history;
    _action(this);
  }

  static emit = (type, payload) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      _action()._dispatch({type, payload});
    });
  };

  static success = (type, payload) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      __action()._dispatch({type: `${type}_SUCCESS`, ...payload});
    });
  };
}

export default Action;
