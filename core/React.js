import { isTextNode } from './utils'
const TEXT_ELEMENT = 'TEXT_ELEMENT'

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return isTextNode(child) ? createTextNode(child) : child
      }),
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
  root = nextUnitOfWork
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

const linkChild = (fiber, children) => {
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = new Fiber(child.type, child.props, fiber)
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}

const updateFunctionComponent = fiber => {
  const children = [fiber.type(fiber.props)]
  linkChild(fiber, children)
}
const updateHostComponent = fiber => {
  if (!fiber.dom) {
    fiber.dom = creatDom(fiber.type)
    handleProps(fiber.dom, fiber.props)
  }
  linkChild(fiber, fiber.props.children)
}

const executeWorkUnit = fiber => {
  const isFunctionComponent = typeof fiber.type === 'function'
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  //4.返回下一个要渲染的单元
  if (fiber.child) {
    return fiber.child
  }

  //链表的下一个节点，如果没有兄弟节点，就找父节点的兄弟节点，直到找到为止
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

let root = null
const commitRoot = () => {
  commitWork(root.child)
  root = null
}
const commitWork = fiber => {
  if (!fiber) return
  let parent = fiber.parent
  while (!parent.dom) {
    parent = parent.parent
  }
  if (fiber.dom) {
    parent.dom.append(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

let nextUnitOfWork = null
const workLoop = deadLine => {
  let shouldYield = false
  while (!shouldYield && nextUnitOfWork) {
    //执行任务
    nextUnitOfWork = executeWorkUnit(nextUnitOfWork)
    shouldYield = deadLine.timeRemaining() < 1
  }
  if (!nextUnitOfWork && root) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
const React = {
  render,
  createElement,
}

export default React
