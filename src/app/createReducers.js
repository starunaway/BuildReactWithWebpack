import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import {combineReducers} from 'redux';
function entries(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}

export default function createReducers(models) {
  if (!isArray(models)) {
    throw Error('models 应该是一个扁平化数组');
  }
  debugger;
  let reducers = {};

  let reducerGroups = collectReducers(models);
  let reducerGroupsEntities = entries(reducerGroups);
  debugger;
  for (let [key, reducerGroup] of reducerGroupsEntities) {
    if (reducers.hasOwnProperty(key)) {
      throw Error('重复声明 key ' + key);
    }
    reducers[key] = initialReducerGroup(reducerGroup);
  }

  return combineReducers(reducers);
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

    if (group[reducer.key] && !reducer.single) {
      throw Error('重复声明 key ' + reducer.key);
    }
    group[reducer.key] = reducer;
  });
  return reducerGroups;
}

function initialReducerGroup(reducerGroup, onReducer) {
  const handlers = {};
  let initialState = {};
  for (let reducer of reducerGroup.values()) {
    if (!reducer.resultKey) {
      reducer.resultKey = 'result';
    }
    if (reducer.single) {
      initialState = reducer.initialState || {};
    } else {
      initialState = overrideState(initialState, reducer.subKeys, reducer.initialState);
    }
  }
}
