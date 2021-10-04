import React, { useContext } from "react";
import UserContext from "./user-context";

function ChildFunctionalContext() {
  const userContext = useContext(UserContext);
  return (
    <div>
      Child Functional Context:{" "}
      {userContext.currentUser ? userContext.currentUser.name : ""}
    </div>
  );
}

export default ChildFunctionalContext;
