// import App from '@app';
// import Action from '@action';
// import routes from '@routes';
// import models from '@models';
// import {onEffect, onFetchOption} from '@utils/reduxUtils';
// import './style.less';

// const app = new App({
//   onEffect,
//   onFetchOption,
// });

// app.setModels(models);
// app.setRouter((r) => routes(r));
// app.start('#root');

// new Action({
//   dispatch: app._store.dispatch,
// });

require('./style.less');
let a = require('./a.js');
console.log('hhhhhhhhhhhhhhhhhhhh', a);

import p from './1.jpg';
let img = document.createElement('img');
img.src = p;
document.body.appendChild(img);
