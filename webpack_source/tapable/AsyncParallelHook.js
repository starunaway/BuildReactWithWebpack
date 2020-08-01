class AsyncParallelHook {
  constructor(args) {
    this.tasks = [];
  }
  tapAsync(name, fn) {
    this.tasks.push(fn);
  }

  callAsync(...args) {
    let finalCallback = args.pop();
    let index = 0;

    const done = () => {
      index++;
      if (index === this.tasks.length) {
        finalCallback();
      }
    };

    this.tasks.forEach((task) => {
      task(...args, done);
    });
  }
}

let hook = new AsyncParallelHook(['name']);
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
