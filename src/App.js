import React, { Component } from "react";
import "./App.css";
import { getMovies } from "./services/fakeMovieService";
import Movies from "./components/movies";
import SidebarTabs from "./components/common/sidebar-tabs";

class App extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <SidebarTabs />
          </div>
          <div className="col">
            <Movies />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
