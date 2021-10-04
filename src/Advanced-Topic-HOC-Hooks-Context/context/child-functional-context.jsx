import React, { useContext } from "react";
import UserContext from "./user-context";
import CartContext from "./cart-context";

function ChildFunctionalContext() {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  console.log("CartContext: ", cartContext);
  return (
    <div>
      Child Functional Context:{" "}
      {userContext.currentUser ? userContext.currentUser.name : ""}
    </div>
  );
}

export default ChildFunctionalContext;
