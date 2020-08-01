export const increment = (data) => {
  return {
    type: 'increment',
    data,
  };
};

// 接受用户的同步action
export const decrement = (data) => {
  return {
    type: 'decrement',
    data,
  };
};

export const asyncIncrement = (data) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({type: 'increment', data});
    }, 2000);
  };
};
