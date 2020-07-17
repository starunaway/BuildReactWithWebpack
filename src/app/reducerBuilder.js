import {combineReducers} from 'redux';
// import createReducer from './createReducer';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import has from 'lodash/has';
import {isArray} from './utils';
export function reducerBuilder(options, onReducer) {
  let reducers = {};
  let reducerGroups = new Map();
  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      let reducer = options[key];
      if (isArray(reducer)) {
        collectReducers(reducerGroups, reducer);
      } else {
        reducers[key] = reducer;
      }
    }
  }

  for (let [key, reducerGroup] of reducerGroups.entries()) {
    if (reducers.hasOwnProperty(key)) {
      throw Error('重复声明 key ' + key);
    }
    reducers[key] = initialReducerGroup(reducerGroup, onReducer);
  }

  return combineReducers(reducers);
}

function collectReducers(reducerGroups, reducers) {
  reducers.forEach((reducer) => {
    let keys = reducer.key.spllit('.');
    let [groupKey, ...subKeys] = keys;
    let group = reducersGroup.get(groupKey);
    // redux key是不是几层
    if (!group) {
      group = new Map();
      reducerGroups.set(groupKey, group);
    }
    if (subKeys.length === 0) {
      reducer.single = true;
    } else {
      reducer.subKeys = subKeys;
    }

    if (group.has(reducer.key) && !reducer.single) {
      throw Error('重复声明 key ' + reducer.key);
    }
    group.set(reducer.key, reducer);
  });
}

function initialReducerGroup(reducerGroup, onReducer) {
  const handlers = {}; // reducer函数
  let initialState = {};
  for (let reducer of reducerGroup.values()) {
    if (!reducer.resultKey) {
      reducer.resultKey = 'result';
    }
    if (reducer.single) {
      initialState = reducer.initialState || {};
    } else {
      overrideState(initialState, reducer.subKeys, reducer.initialState);
    }

    let reducerAction = reducer.action;
    if (!reducerAction) {
      reducerAction = reducer.key;
    }
    const isFunc = typeof onReducer === 'function';

    // 这里涉及到有异步操作的地方，和 axios 有关
    handlers[reducerAction] = reducerHandler(reducer, 'loading', (state, action) => {
      const {payload, ...other} = action;
      delete other.type;
      let newState = {
        [reducer.resultKey]: null,
        payload: payload,
        success: false,
        loading: true,
        fromSocket: false,
        ...other,
      };
      if (isFunc) {
        newState = onReducer(newState, state, action, 'loading');
      }
      return newState;
    });

    handlers[`${reducerAction}_SUCCESS`] = reducerHandler(reducer, 'success', (state, action) => {
      const {done, fromSocket, result, payload, ...other} = action;
      delete other.type;
      let newState = {};
      if (fromSocket && done) {
        newState = result;
      } else {
        newState = {
          [reducer.resultKey]: result,
          payload: payload,
          success: true,
          loading: false,
          fromSocket,
          ...other,
        };
      }
      if (isFunc) {
        newState = onReducer(newState, state, action, 'success');
      }
      return newState;
    });
    handlers[`${reducerAction}_FAIL`] = reducerHandler(reducer, 'fail', (state, action) => {
      const {payload, error, ...other} = action;
      delete other.type;
      let newState = {
        payload: payload,
        error: error,
        success: false,
        loading: false,
        fromSocket: false,
        ...other,
      };
      if (isFunc) {
        newState = onReducer(newState, state, action, 'fail');
      }
      return newState;
    });
  }

  return createReducer(initialState, handlers);
}
function overrideState(state, keys, value = {}) {
  let length = keys.length;
  if (length === 1) {
    return (state[keys[0]] = value);
  }
  let previous = state;
  for (let i = 0; i < length; ++i) {
    if (i === length - 1) {
      previous[keys[i]] = value;
    } else {
      let next = previous[keys[i]];
      if (!next) {
        next = previous[keys[i]] = {};
      }
      previous = next;
    }
  }
}
function reducerHandler(reducer, method, handler) {
  return (state, action) => {
    let result;
    if (reducer[method]) {
      result = reducer[method](state, action);
    } else {
      result = handler(state, action);
    }
    if (reducer.single) {
      state = result;
    } else {
      state = {...state};
      overrideState(state, reducer.subKeys, result);
    }
    return state;
  };
}

function createReducer(initialState, handlers) {
  if (isNil(initialState)) {
    throw new Error('Initial state is required');
  }

  if (isNil(handlers) || !isObject(handlers)) {
    throw new Error('Handlers must be an object');
  }

  return (state = initialState, action) => {
    if (isNil(action) || !has(action, 'type')) {
      return state;
    }

    const handler = handlers[action.type];
    let newState = isNil(handler) ? state : handler(state, action);
    if (!action.type.endsWith('_FAIL')) {
      delete newState.error;
    }
    return newState;
  };
}
