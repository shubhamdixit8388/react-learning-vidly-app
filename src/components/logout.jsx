import React from "react";
import Auth from "../services/auth-service";

class Logout extends React.Component {
  componentDidMount() {
    Auth.logout();
    window.location = "/login";
  }
  render() {
    return null;
  }
}

export default Logout;