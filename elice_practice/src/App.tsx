import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

type CounterProps = {
  title: string;
  initValue?: number;
};

//props={title:"불명증 카운터", initValue:10}
//const {title} = props;
//console.log(title) -> 불명증 카운터
function Counter({ title, initValue = 10 }: CounterProps) {
  // let countState = useState(initValue);
  // let count = countState[0];
  // let setCount = countState[1];

  const [count, setCount] = useState(initValue);

  //함수안에 함수 : 클로저 개념
  function up() {
    setCount(count + 1);
  }
  console.log(title, count);
  return (
    <>
      <h1>{title}</h1>
      <button onClick={up}>+</button> {count}
    </>
  );
}

function App() {
  return (
    <div>
      <Counter title="불면증 카운터" initValue={20} />
      <Counter title="불면증 카운터" />
    </div>
  );
}

export default App;
