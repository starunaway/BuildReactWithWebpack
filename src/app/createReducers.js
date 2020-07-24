import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import {checkKey, entries, updateState} from './utils';

export default function createReducers(models) {
  if (!isArray(models)) {
    throw Error('models 应该是一个扁平化数组');
  }

  let reducers = {};
  checkKey(models);
  let reducerGroups = collectReducers(models);

  for (let [key, reducerGroup] of entries(reducerGroups)) {
    reducers[key] = initialReducer(reducerGroup);
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

function initialReducer(reducerGroup) {
  const handlers = {};
  let initialState = {};
  for (let reducer of Object.values(reducerGroup)) {
    if (!reducer.resultKey) {
      reducer.resultKey = 'result';
    }
    if (reducer.single) {
      initialState = reducer.initialState || {};
    } else {
      updateState(initialState, reducer.subKeys, reducer.initialState);
    }

    // 对reducer.key 下的action 创建 switch action.type 的处理函数
    handlers[reducer.key] = reducerHandler(reducer);

    // 这是一个请求
    if (reducer.method && reducer.url) {
      handlers[`${reducer.key}_LOADING`] = reducerHandler(reducer, '_LOADING');
      handlers[`${reducer.key}_SUCCESS`] = reducerHandler(reducer, '_SUCCESS');
      handlers[`${reducer.key}_FAIL`] = reducerHandler(reducer, '_FAIL');
    }
  }

  return createReducer(initialState, handlers);
}

// 返回redcuer，  const key1 = ()=>{}
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

    // 这里的action 可能是一个函数，这种action 需要生成

    // 这里需要判断model的属性，丢拦截action，判断请求

    const handler = handlers[action.type];
    let newState = isNil(handler) ? state : handler(state, action);
    return newState;
  };
}

// 创建reducer
function reducerHandler(reducer, type) {
  return (state, action) => {
    let result;
    if (reducer.reducer) {
      result = reducer.reducer(state, action);
    } else {
      if (type) {
        result = asyncReducer[type](reducer)(state, action);
      } else {
        result = syncReducer(state, action);
      }
    }

    if (reducer.single) {
      state = result;
    } else {
      state = {...state};
      updateState(state, reducer.subKeys, result);
    }
    return state;
  };
}

// 默认的reducer，同步的
function syncReducer(state, action) {
  const {payload, ...other} = action;
  delete other.type;
  return payload;
}

const asyncReducer = {
  _LOADING: function (reducer) {
    return (state, action) => {
      const {payload} = action;
      return {
        payload: payload,
        success: false,
        loading: true,
        [reducer.resultKey]: null,
      };
    };
  },
  _SUCCESS: function (reducer) {
    return (state, action) => {
      const {payload, result} = action;
      return {
        payload: payload,
        success: true,
        loading: false,
        [reducer.resultKey]: result,
      };
    };
  },
  _FAIL: function (reducer) {
    return (state, action) => {
      const {payload, error} = action;
      return {
        payload: payload,
        success: false,
        loading: false,
        error: error,
      };
    };
  },
};
