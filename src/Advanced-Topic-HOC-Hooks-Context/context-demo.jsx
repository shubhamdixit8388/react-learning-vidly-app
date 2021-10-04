import React, { Component } from "react";
import Parent from "./context/parent";
import UserContext from "./context/user-context";
import Login from "./context/login";

class ContextDemo extends Component {
  state = { currentUser: null };

  handleLoggedIn = () => {
    const currentUser = { name: "SVD" };
    this.setState({ currentUser });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          currentUser: this.state.currentUser,
          onLoggedIn: this.handleLoggedIn,
        }}
      >
        <div>
          <Parent />
        </div>
        <Login />
      </UserContext.Provider>
    );
  }
}

export default ContextDemo;
