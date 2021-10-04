import React, { useContext } from "react";
import UserContext from "./user-context";

const Login = (props) => {
  const userContext = useContext(UserContext);
  return <button onClick={() => userContext.onLoggedIn("")}>Login</button>;
};

export default Login;
