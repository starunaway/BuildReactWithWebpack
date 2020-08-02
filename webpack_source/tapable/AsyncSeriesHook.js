class AsyncSeriesHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, fn) {
    this.tasks.push(fn);
  }

  callAsync(...args) {
    let index = 0;
    let finalCallback = args.pop();
    let next = () => {
      if (this.tasks.length === index) {
        return finalCallback();
      }

      let task = this.tasks[index++];
      task(...args, next);
    };
    next();
  }
}

export default AsyncSeriesHook;

let hook = new AsyncSeriesHook(['name']);
hook.tapAsync('react', function (name, cb) {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 1000);
});

hook.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node', name);
    cb();
  }, 2000);
});

hook.callAsync('hhhh', () => {
  console.log('end');
});
