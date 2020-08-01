class SyncWaterfallHook {
  constructor(args) {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    const [first, ...other] = this.tasks;
    let result = first(...args);
    other.reduce((acc, next) => {
      return next(acc);
    }, result);

    // let result;
    // for (let i = 0; i < this.tasks.length; i++) {
    //   if (i == 0) {
    //     result = this.tasks[i](...args);
    //   } else {
    //     result = this.tasks[i](result);
    //   }
    // }
  }
}

export default SyncWaterfallHook;

let hook = new SyncWaterfallHook(['name']);
hook.tap('react', function (name) {
  console.log('react', name);
  return 1;
});

hook.tap('node', function (name) {
  console.log('node', name);
  return 'sdfgjhsgdfh ';
});

hook.tap('vue', function (name) {
  console.log('vue', name);
});

hook.call('hhhh');
