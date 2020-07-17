import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import has from 'lodash/has';
import isArray from 'lodash/isArray';
import {combineReducers} from 'redux';

export function createReducers(models) {
  if (!isArray(models)) {
    throw Error('models 应该是一个扁平化数组');
  }
  let reducers = {};

  let reducerGroups = collectReducers(models);
  for (let [key, reducerGroup] of reducerGroups.entries()) {
    if (reducers.hasOwnProperty(key)) {
      throw Error('重复声明 key ' + key);
    }
    reducers[key] = initialReducerGroup(reducerGroup);
  }

  return combineReducers(reducers);
}

function collectReducers(reducers) {
  let reducerGroups = new Map();
  reducers.forEach((reducer) => {
    let [groupKey, ...subKeys] = reducer.key.split('.');
    let group = reducerGroups.get(groupKey);
    // 当前的 groupKey 没有构建group
    if (!group) {
      group = new Map();
      reducerGroups.set(groupKey, group);
    }

    if (subKeys.length === 0) {
      reducer.single === 0;
    } else {
      reducer.subKeys = subKeys;
    }

    if (group.has(reducer.key) && !reducer.single) {
      throw Error('重复声明 key ' + reducer.key);
    }
    group.set(reducer.key, reducer);
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
  }
}
