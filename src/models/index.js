export default [
  {
    key: 'count',
    initialState: {
      color: 'red',
      year: 2019,
    },
    reducer: (state, action) => {},
  },
  {
    key: 'color.color',
    initialState: 'red',
  },
  {
    key: 'year',
    initialState: 2019,
  },
  {
    key: 'count.year',
    initialState: {
      color: 'red',
      year: 2019,
    },
    reducer: (state, action) => {},
  },
  {
    key: 'count.color',
    initialState: 'red',
    reducer: (state, action) => {},
  },
  {
    key: 'count.day',
    initialState: {
      color: 'blue',
      day: 1,
    },
    reducer: (state, action) => {},
  },
  {
    key: 'count.times.click',
    initialState: 0,
    reducer: (state, action) => {},
  },
  {
    key: 'color',
    initialState: 'red',
  },

  {
    key: 'user',
    method: 'POST',
    url: () => '/',
    body: (payload) => {},
    success: () => {},
  },
];
