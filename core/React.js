const TEXT_ELEMENT = 'TEXT_ELEMENT';

const createElement = (type,props,...children) => {
  return {
    type,
    props:{
      ...props,
      children:children.map(child => typeof child === 'string' ? createTextNode(child) : child )
    }
  }
}
const createTextNode = (textValue) => {
  return {
    type:TEXT_ELEMENT,
    props:{
      nodeValue:textValue,
      children:[]
    }
  }
}

const render = (vdom,container) => {
  const dom = vdom.type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(vdom.type);
  Object.keys(vdom.props).forEach(key => {
    if (key !== 'children') {
      dom[key] = vdom.props[key];
    }
  });
  vdom.props.children.forEach(child => {
    render(child,dom);
  })
  container.appendChild(dom);
}

const React = {
  render,
  createElement,
}

export default React