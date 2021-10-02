import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/not-found";
import MovieForm from "./components/movie-form";
import LoginForm from "./components/login-from";
import RegisterForm from "./components/register-form";
import Logout from "./components/logout";
import Auth from "./services/auth-service";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protected-route";

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
      { label: "Movies", link: "movies" },
      { label: "Login", link: "login" },
      { label: "Register", link: "register" },
    ],
    selectedNavBar: "",
  };

  componentDidMount() {
    const user = Auth.getCurrentUser();
    this.setState({
      selectedNavBar: this.getNavbariItems()[0],
      user,
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
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" exact />
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
