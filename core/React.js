const createElement = (type,props,...children) => {
  return {
    type,
    props:{
      ...props,
      children:children.map(child => typeof child === 'object' ? child : createTextNode(child))
    }
  }
}
const TEXT_ELEMENT = 'TEXT_ELEMENT';
const createTextNode = (textValue) => {
  return {
    type:TEXT_ELEMENT,
    props:{
      textValue,
      children:[]
    }
  }
}

const render = (vdom,container) => {
  if (vdom.type === TEXT_ELEMENT) {
    const textNode = document.createTextNode(vdom.props.textValue);
    container.appendChild(textNode);
    return;
  }

  const dom = document.createElement(vdom.type);
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