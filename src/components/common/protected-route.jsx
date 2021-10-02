import React from "react";
import Auth from "../../services/auth-service";
import { Route, Redirect } from "react-router";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = Auth.getCurrentUser();
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (user)
          return Component ? (
            <Component {...props} user={user} />
          ) : (
            render(props)
          );
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
