class AsyncParallelHookPromise {
  constructor(args) {
    this.tasks = [];
  }
  tapPromise(name, fn) {
    this.tasks.push(fn);
  }

  promise(...args) {
    let tasks = this.tasks.map((task) => task(...args));
    return Promise.all(tasks);
  }
}

export default AsyncParallelHookPromise;

let hook = new AsyncParallelHookPromise(['name']);
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
