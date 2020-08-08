let loaderUtils = require('loader-utils');

function loader(source) {
  let style = `
	let style = document.createElement('style');
	style.innerHTML =${JSON.stringify(source)};
	document.head.appendChild(style);
  `;

  return style;
}

loader.pitch = function (remainingRequest) {
  // 剩余的请求

  let style = `
  let style = document.createElement('style');
  style.innerHTML =require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
  document.head.appendChild(style);
`;

  return style;
};

module.exports = loader;
