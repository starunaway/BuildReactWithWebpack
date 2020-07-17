export const isFunction = (o) => typeof o === 'function';
export const isString = (o) => typeof o === 'string';
export const isArray = Array.isArray.bind(Array);

export function isHTMLElement(node) {
  return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
}
