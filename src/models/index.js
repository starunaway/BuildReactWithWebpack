const A = [
  {
    key: 'count.year',
    initialState: {
      color: 'red',
      year: 2019,
    },
    reducer: (state, action) => {
      console.log('count.year reducer', state, action);
    },
  },

  {
    key: 'count.day',
    initialState: {
      color: 'blue',
      day: 1,
    },
    reducer: (state, action) => {
      console.log('count.day reducer', state, action);
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

  {
    key: 'user',
    method: 'POST',
    url: () => '/',
    body: (payload) => {},
    reducer: () => {},
  },
];

const b = [
  {
    key: 'count.count',
    initialState: 'count.count',
  },

  {
    key: 'count.second.third',
    initialState: 'count.second.third',
  },
  {
    key: 'count.second.type',
    initialState: 'count.second.third.forth',
  },
  {
    key: 'second.type',
    initialState: 'count.second.third.forth',
  },
  {
    key: 'count.type',
    initialState: 'count.second.third.forth',
  },

  {
    key: 'type',
    initialState: 'count.second.third.forth',
  },
];

export default A;
