import moment from 'moment';
import printMe from './print';
import './style.less';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.innerHTML = 'hello webpack';
  element.innerHTML += moment().format('YYYY-MM-DD HH:mm:ss');

  element.classList.add('time');
  element.appendChild(btn);

  return element;
}
document.body.appendChild(component());
