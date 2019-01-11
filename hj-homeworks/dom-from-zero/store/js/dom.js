'use strict';
let newElement;

function createElement(node) {
  console.log(node)
  if (typeof node === 'object') {
    newElement = document.createElement(node.name);
    if (node.props !== null) {
      Object.keys(node.props).forEach(prop => newElement.setAttribute(prop, node.props[prop]));
    }
    node.childs.forEach(child => createElement.call(newElement, child));
    return newElement;
  }
  if (typeof node === 'string') {
    this.textContent = node;
  }
  console.log(newElement)
}