import {combineReducers} from 'redux';

// export default combineReducers({count});
function count(state = 1, action) {
  switch (action.type) {
    case 'increment':
      return state + action.payload.value;
    case 'decrement':
      return state - action.payload.value;
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// export default count;

export default combineReducers({count, user});
