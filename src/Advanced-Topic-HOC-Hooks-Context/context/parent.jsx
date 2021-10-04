import React from "react";
import Child from "./child";

class Parent extends React.Component {
  render() {
    return (
      <div>
        <Child />
      </div>
    );
  }
}

export default Parent;
