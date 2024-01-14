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
  // const dom = vdom.type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(vdom.type)
  // Object.keys(vdom.props).forEach(key => {
  //   if (key !== 'children') {
  //     dom[key] = vdom.props[key]
  //   }
  // })
  // vdom.props.children.forEach(child => {
  //   render(child, dom)
  // })
  // container.appendChild(dom)
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [vdom],
    },
  }
}

const executeWorkUnit = (fiber)=>{
  console.log(fiber,'---work');
  //1.创建dom
  if(!fiber.dom){
    const dom = fiber.type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(fiber.type)
    fiber.dom = dom
    fiber.parent.dom?.append(dom)

    //2.创建props
    Object.keys(fiber.props).forEach(key => {
      if (key !== 'children') {
        dom[key] = fiber.props[key]
      }
    })
  }
  //3.创建关系，转成链表
  let prevChild = null
  fiber.props.children.forEach((child,index)=>{
    child.parent = fiber
    if(index === 0){
      fiber.child = child
    }else{
      child.sibling = prevChild
    }
    prevChild = child
  })
  //4.返回下一个要渲染的单元
  if(fiber.child){
    return fiber.child
  }

  if(fiber.sibling){
    return fiber.sibling
  }

  return fiber.parent?.sibling
}

let nextUnitOfWork = null
const workLoop = (deadLine) => {
  let shouldYield = false
   while(!shouldYield && nextUnitOfWork){
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