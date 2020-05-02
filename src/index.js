import moment from 'moment';

function component() {
  var element = document.createElement('div');
  element.innerHTML = 'hello webpack';
  element.innerHTML += moment().format('YYYY-MM-DD HH:mm:ss');
  return element;
}
document.body.appendChild(component());
