import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import {checkKey, entries} from './utils';

export default function createReducers(models) {
  if (!isArray(models)) {
    throw Error('models 应该是一个扁平化数组');
  }
  //   reducers = {
  // 	  key1:(state, action) =>{},
  // 	  key2:(state, action) =>{}
  //   }
  let reducers = {};
  checkKey(models);
  let reducerGroups = collectReducers(models);

  //   reducerGroups = {

  //   }

  let reducerGroupsEntities = entries(reducerGroups);
  for (let [key, reducerGroup] of reducerGroupsEntities) {
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

    handlers[reducerAction] = reducerHandler(reducer, (state, action) => {
      console.log('处理action');
    });
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
    if (isNil(action)) {
      return state;
    }

    const handler = handlers[action];
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
      let next = previous[keys[i]];
      if (!next) {
        next = previous[keys[i]] = {};
      }
      previous = next;
    }
  }
}

// 创建reducer,handler是一个默认的处理函数
function reducerHandler(reducer, handler) {
  return (state, action) => {
    let result;
    if (reducer.reducer) {
      result = reducer.reducer(state, action);
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
