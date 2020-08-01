class SyncBailHook {
  constructor(args) {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i](...args) !== undefined) {
        break;
      }
    }
    // let ret;
    // let index = 0;

    // do {
    //   ret = this.tasks[index++](...args);
    // } while (ret === undefined && index < this.tasks.length);
  }
}

export default SyncBailHook;

let hook = new SyncBailHook(['name']);
hook.tap('react', function (name) {
  console.log('react', name);
  return 1;
});

hook.tap('node', function (name) {
  console.log('node', name);
});

hook.call('hhhh');
