import moment from 'moment';
import './style.less';

function component() {
  var element = document.createElement('div');
  element.innerHTML = 'hello webpack';
  element.innerHTML += moment().format('YYYY-MM-DD HH:mm:ss');

  element.classList.add('time');
  return element;
}
document.body.appendChild(component());
