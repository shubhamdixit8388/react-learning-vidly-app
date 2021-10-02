import React, { Component } from "react";
import "./App.css";
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
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    navBarItems: [
      { label: "Movies", link: "movies" },
      { label: "Cutomers", link: "customers" },
      { label: "Rentals", link: "rentals" },
      { label: "Login", link: "login" },
      { label: "Register", link: "register" },
    ],
    selectedNavBar: "",
  };

  componentDidMount() {
    this.setState({
      selectedNavBar: this.state.navBarItems[0],
    });
  }

  render() {
    const { navBarItems, selectedNavBar } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <NavBar
            navBarItems={navBarItems}
            selectedNavBar={selectedNavBar}
            onNavBarChange={this.handleNavBarSelect}
          />
        </div>
        <main className="container mt-3">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
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
