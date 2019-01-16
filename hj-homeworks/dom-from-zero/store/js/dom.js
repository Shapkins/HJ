'use strict';

function createElement(node) {
  if (typeof node === 'object') {
    const newElement = document.createElement(node.name);
    if (node.props !== null) {
      Object.keys(node.props).forEach(prop => newElement.setAttribute(prop, node.props[prop]));
    }
    node.childs.forEach(child => newElement.appendChild(createElement(child)));
    return newElement;
  }
  if (typeof node === 'string') {
    const newElement = document.createTextNode(node);
    return newElement;
  }
}