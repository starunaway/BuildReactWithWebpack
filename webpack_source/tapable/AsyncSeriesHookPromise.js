class AsyncSeriesHookPromise {
  constructor(args) {
    this.tasks = [];
  }
  tapPromise(name, fn) {
    this.tasks.push(fn);
  }

  promise(...args) {
    let [first, ...others] = this.tasks;
    return others.reduce((p, next) => {
      return p.then(() => next(...args));
    }, first(...args));
  }
}

export default AsyncSeriesHookPromise;

let hook = new AsyncSeriesHookPromise(['name']);
hook.tapPromise('react', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name);
      resolve();
    }, 2000);
  });
});

hook.tapPromise('node', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name);
      resolve();
    }, 1000);
  });
});

hook.promise('hhhh').then(function () {
  console.log('end');
});
