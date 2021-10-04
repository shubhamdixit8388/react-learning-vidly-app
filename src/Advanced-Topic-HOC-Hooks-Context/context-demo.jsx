import React, { Component } from "react";
import Parent from "./context/parent";
import UserContext from "./context/user-context";
import Login from "./context/login";
import CartContext from "./context/cart-context";

class ContextDemo extends Component {
  state = { currentUser: null };

  handleLoggedIn = () => {
    const currentUser = { name: "SVD" };
    this.setState({ currentUser });
  };

  render() {
    return (
      <CartContext.Provider value={{ item: ["1", "2"] }}>
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
      </CartContext.Provider>
    );
  }
}

export default ContextDemo;
