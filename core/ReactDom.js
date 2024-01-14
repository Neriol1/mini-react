import React from "./React";
const ReactDOM = {
  createRoot(container){
    return {
      render(vdom){
        container.innerHTML = '';
        React.render(vdom,container);
      }
    }
  } 
}

export default ReactDOM;