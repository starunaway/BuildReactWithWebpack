//根据reducer函数 创建store
export function createStore(reducer) {
  // 初始值
  let state = reducer(undefined, {
    type: '@@redux/init',
  });
  // 存储监听state变化的回调函数
  const listeners = [];

  // 返回state数据
  function getState() {
    return state;
  }
  // 分发action，触发reducer，产生新的state
  function dispatch(action) {
    const newState = reducer(state, action);
    state = newState;
    listeners.forEach((listener) => listener());
  }
  // 绑定内部state监听
  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// 将多个reducer函数整合
export function combineReducers(reducers) {
  return (state = {}, action) => {
    const newState = {};
    Object.keys(reducers).forEach((key) => {
      newState[key] = reducers[key](state[key], action);
    });
    return newState;
  };
}
