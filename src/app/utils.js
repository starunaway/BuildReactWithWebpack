export function checkKey(model) {
  let keys = model.map((m) => m.key);
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      if (keys[j] === keys[i]) {
        throw new Error(`${keys[i]} duplicated define`);
      }
      if (keys[j].indexOf(keys[i]) === 0) {
        throw new Error(`${keys[j]} will overwrite ${keys[i]}`);
      }
      if (keys[i].indexOf(keys[j]) === 0) {
        throw new Error(`${keys[i]} will overwrite ${keys[j]}`);
      }
    }
  }
}

export function entries(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}
