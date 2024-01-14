import React from './core/React';
import ReactDOM from './core/ReactDom';

const root = document.querySelector('#root');
const app = React.createElement('div',{id:'app'},'hello mini-react');
ReactDOM.createRoot(root).render(app);

