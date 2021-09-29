import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router";
import { getMovies } from "./services/fakeMovieService";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/not-found";

class App extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <NavBar />
        </div>
        <main className="container mt-3">
          <Switch>
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
}

export default App;
