import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/not-found";
import MovieForm from "./components/movie-form";

class App extends Component {
  state = {
    navBarItems: [
      { label: "Movies", link: "movies" },
      { label: "Cutomers", link: "customers" },
      { label: "Rentals", link: "rentals" },
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
