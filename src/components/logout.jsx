import React from "react";

class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/login";
  }
  render() {
    return null;
  }
}

export default Logout;
