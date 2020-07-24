import {combineReducers} from '../lib/redux';

// export default combineReducers({count});
function count(state = 1, action) {
  switch (action.type) {
    case 'increment':
      return state + action.data;
    case 'decrement':
      return state - action.data;
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
