import React, { Component } from "react";
import Parent from "./context/parent";
import UserContext from "./context/user-context";

class ContextDemo extends Component {
  state = { currentUser: { name: "svasadad" } };
  render() {
    return (
      <UserContext.Provider value={this.state.currentUser}>
        <div>
          <Parent />
        </div>
      </UserContext.Provider>
    );
  }
}

export default ContextDemo;
