import React from "./core/React"

const Count = function ({ num }) {
  const onClick = () => {
    console.log(1);
  }

  console.log(num);
  return <div onclick={onClick}>count is {num}</div>
}
const CountContainer = function () {
  return <Count num={true}></Count>
}

export const App = <div>
  {/* <section id="aaa">1111</section>
  <span>2222</span> */}
  hello,mini-react
  <CountContainer />
  {/* <CountContainer /> */}
  <Count num={1}></Count>
  <Count num={2}></Count>
</div>