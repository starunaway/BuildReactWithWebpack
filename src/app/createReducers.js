import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import {checkKey, entries} from './utils';

export default function createReducers(models) {
  if (!isArray(models)) {
    throw Error('models 应该是一个扁平化数组');
  }

  let reducers = {};
  checkKey(models);
  let reducerGroups = collectReducers(models);

  for (let [key, reducerGroup] of entries(reducerGroups)) {
    reducers[key] = initialReducerGroup(reducerGroup);
  }
  return reducers;
}

function collectReducers(reducers) {
  let reducerGroups = {};

  reducers.forEach((reducer) => {
    let [groupKey, ...subKeys] = reducer.key.split('.');
    let group = reducerGroups[groupKey];
    // 当前的 groupKey 没有构建group
    if (!group) {
      group = {};
      reducerGroups[groupKey] = group;
    }

    if (subKeys.length === 0) {
      reducer.single = true;
    } else {
      reducer.subKeys = subKeys;
    }

    group[reducer.key] = reducer;
  });
  return reducerGroups;
}

function initialReducerGroup(reducerGroup) {
  const handlers = {};
  let initialState = {};
  for (let reducer of Object.values(reducerGroup)) {
    if (!reducer.resultKey) {
      reducer.resultKey = 'result';
    }
    if (reducer.single) {
      initialState = reducer.initialState || {};
    } else {
      overrideState(initialState, reducer.subKeys, reducer.initialState);
    }

    let reducerAction = reducer.key;

    handlers[reducerAction] = reducerHandler(reducer);
  }

  return createReducer(initialState, handlers);
}

function createReducer(initialState, handlers) {
  if (isNil(initialState)) {
    throw new Error('没有初始state');
  }
  if (isNil(handlers) || !isObject(handlers)) {
    throw new Error('Handlers must be an object');
  }

  return (state = initialState, action) => {
    if (isNil(action) || !action.type) {
      return state;
    }

    const handler = handlers[action.type];
    let newState = isNil(handler) ? state : handler(state, action);
    return newState;
  };
}

function overrideState(state, keys, value = {}) {
  let length = keys.length;
  if (length === 1) {
    state[keys[0]] = value;
    return;
  }
  let previous = state;
  for (let i = 0; i < length; ++i) {
    if (i === length - 1) {
      previous[keys[i]] = value;
    } else {
      if (!previous[keys[i]]) {
        previous[keys[i]] = {};
      }
      let next = previous[keys[i]];
      previous = next;
    }
  }
}

// 创建reducer
function reducerHandler(reducer) {
  return (state, action) => {
    let result;
    if (reducer.reducer) {
      debugger;
      result = reducer.reducer(state, action);
    } else {
      result = default_reducer(state, action);
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

function default_reducer(state, action) {
  const {payload, ...other} = action;
  delete other.type;
  return payload;
}
