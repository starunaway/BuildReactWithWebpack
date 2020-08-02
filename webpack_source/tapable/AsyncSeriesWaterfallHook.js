class AsyncSeriesWaterfallHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, fn) {
    this.tasks.push(fn);
  }

  callAsync(...args) {
    let index = 0;
    let finalCallback = args.pop();
    let next = (err, data) => {
      let task = this.tasks[index];
      if (!task) {
        return finalCallback();
      }
      if (index === 0) {
        task(...args, next);
      } else {
        task(data, next);
      }
      index++;
    };
    next();
  }
}

export default AsyncSeriesWaterfallHook;

let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('react', function (name, cb) {
  setTimeout(() => {
    console.log('react', name);
    cb(null, '结果');
  }, 1000);
});

hook.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node', name);
    cb(null);
  }, 2000);
});

hook.callAsync('hhhh', () => {
  console.log('end');
});
