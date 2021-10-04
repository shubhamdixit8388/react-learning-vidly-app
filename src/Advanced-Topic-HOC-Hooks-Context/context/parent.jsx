import React from "react";
import Child from "./child";
import ChildFunctionalContext from "./child-functional-context";

class Parent extends React.Component {
  render() {
    return (
      <div>
        <h1>Class context</h1>
        <Child />
        <br />
        <br />
        <br />
        <br />
        <h1>Functinal context</h1>
        <ChildFunctionalContext />
      </div>
    );
  }
}

export default Parent;
