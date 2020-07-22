const A = [
  {
    key: 'count.year',
    initialState: {
      color: 'red',
      year: 2019,
    },
    reducer: (state, action) => {
      const year = state.year;
      return {
        ...year,
        ...action.payload,
      };
    },
  },

  {
    key: 'count.day',
    initialState: {
      color: 'blue',
      day: 1,
    },
    reducer: (state, action) => {
      const day = state.day;
      return {
        ...day,
        ...action.payload,
      };
    },
  },
  {
    key: 'count.times.click',
    initialState: 0,
  },
  {
    key: 'color',
    initialState: 'red',
  },

  // {
  //   key: 'user',
  //   method: 'POST',
  //   url: () => '/',
  //   body: (payload) => {},
  //   reducer: () => {},
  // },
];

export default A;
