import React, { useContext } from "react";
import UserContext from "./user-context";

function ChildFunctionalContext(props) {
  const context = useContext(UserContext);
  console.log(context);
  return <div>Child Functional Context: {context.name}</div>;
}

export default ChildFunctionalContext;
