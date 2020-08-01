class SyncLoopHook {
  constructor(args) {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    this.tasks.forEach((task) => {
      let result;
      let taskIndex = 0;
      do {
        if (taskIndex === 0) {
          result = task(...args);
        } else {
          result = task(...args);

          //   result = task(result);
        }
        taskIndex++;
      } while (result !== undefined);
    });
  }
}

// export default SyncHook;

let hook = new SyncLoopHook(['name']);
let total = 0;

hook.tap('react', function (name) {
  console.log('react', name);
  return ++total === 3 ? undefined : '继续学';
});

hook.tap('node', function (name) {
  console.log('node', name);
});

hook.tap('vue', function (name) {
  console.log('vue', name);
});

hook.call('学习开始');
