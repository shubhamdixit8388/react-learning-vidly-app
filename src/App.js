import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/not-found";
import MovieForm from "./components/movie-form";
import LoginForm from "./components/login-from";
import RegisterForm from "./components/register-form";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    navBarItemsAuthenticated: [
      { label: "Movies", link: "movies" },
      { label: "Cutomers", link: "customers" },
      { label: "Rentals", link: "rentals" },
      { label: "name", link: "#" },
      { label: "Logout", link: "logout" },
    ],
    navBarItemsNotAuthenticated: [
      { label: "Login", link: "login" },
      { label: "Register", link: "register" },
    ],
    selectedNavBar: "",
    user: {},
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
      console.log(user);
    } catch (error) {}
    this.setState({
      selectedNavBar: this.getNavbariItems()[0],
    });
  }

  getNavbariItems() {
    const { navBarItemsAuthenticated, navBarItemsNotAuthenticated, user } =
      this.state;
    return user && user.email
      ? navBarItemsAuthenticated
      : navBarItemsNotAuthenticated;
  }

  render() {
    const { selectedNavBar, user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <NavBar
            navBarItems={this.getNavbariItems()}
            selectedNavBar={selectedNavBar}
            onNavBarChange={this.handleNavBarSelect}
            user={user}
          />
        </div>
        <main className="container mt-3">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Movies} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }

  handleNavBarSelect = (selectedNavBar) => {
    this.setState({ selectedNavBar });
  };
}

export default App;
