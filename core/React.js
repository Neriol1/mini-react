const TEXT_ELEMENT = 'TEXT_ELEMENT'

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => (typeof child === 'string' ? createTextNode(child) : child)),
    },
  }
}
const createTextNode = textValue => {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: textValue,
      children: [],
    },
  }
}
const render = (vdom, container) => {
  nextUnitOfWork = new Fiber(null, { children: [vdom] }, null, container)
}
const creatDom = type => {
  return type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type)
}
const handleProps = (dom, props) => {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

class Fiber {
  constructor(type, props, parent, dom = null, child = null, sibling = null) {
    this.type = type
    this.props = props
    this.parent = parent
    this.dom = dom
    this.child = child
    this.sibling = sibling
  }
}

const linkChild = fiber => {
  let prevChild = null
  fiber.props.children.forEach((child, index) => {
    const newFiber = new Fiber(child.type, child.props, fiber)
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}

const executeWorkUnit = fiber => {
  if (!fiber.dom) {
    const dom = (fiber.dom = creatDom(fiber.type))
    fiber.parent.dom?.append(dom)
    //2.创建props
    handleProps(dom, fiber.props)
  }
  //3.创建关系，转成链表
  linkChild(fiber)
  //4.返回下一个要渲染的单元
  if (fiber.child) {
    return fiber.child
  }

  if (fiber.sibling) {
    return fiber.sibling
  }

  return fiber.parent?.sibling
}

let nextUnitOfWork = null
const workLoop = deadLine => {
  let shouldYield = false
  while (!shouldYield && nextUnitOfWork) {
    //执行任务
    nextUnitOfWork = executeWorkUnit(nextUnitOfWork)
    shouldYield = deadLine.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
const React = {
  render,
  createElement,
}

export default React
