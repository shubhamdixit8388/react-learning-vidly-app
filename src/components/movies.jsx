import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SidebarTabs from "./common/sidebar-tabs";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPageNumber: 1,
    selectedGenre: { name: "All Genres" },
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  render() {
    const {
      movies: allMovies,
      currentPageNumber,
      pageSize,
      genres,
      selectedGenre,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filteredMovies, currentPageNumber, pageSize);

    if (!this.state.movies.length) {
      return <h1 className="m-4">There are no movies in the database.</h1>;
    }
    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <SidebarTabs
              genres={genres}
              onItemSelect={this.handleGenreChange}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            <h1 className="m-4">
              Showing {filteredMovies.length} movies in the database.
            </h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col" />
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => {
                  return (
                    <tr key={movie.title}>
                      <th>{movie.title}</th>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          liked={movie.liked}
                          onLikeClick={this.handleLikeClick}
                          movie={movie}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.deleteMovie(movie)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              itemsCount={filteredMovies.length}
              pageSize={this.state.pageSize}
              onItemSelect={this.handlePageChange}
              selectedItem={this.state.currentPageNumber}
            />
          </div>
        </div>
      </main>
    );
  }

  handleGenreChange = (selectedGenre) => {
    if (selectedGenre !== this.state.selectedGenre) {
      this.setState({ selectedGenre, currentPageNumber: 1 });
    }
  };

  handlePageChange = (currentPageNumber) => {
    if (this.state.currentPageNumber !== currentPageNumber) {
      this.setState({ currentPageNumber });
    }
  };

  handleLikeClick = (updateMovie) => {
    const movies = [...this.state.movies];
    const updateMovieIndex = movies.indexOf(updateMovie);
    movies[updateMovieIndex] = { ...movies[updateMovieIndex] };
    movies[updateMovieIndex].liked = !movies[updateMovieIndex].liked;
    this.setState({ movies });
    console.log(movies[updateMovieIndex]);
  };

  getMovieCount() {
    return (
      this.state.movies.length && (
        <h1 className="m-4">
          Showing {this.state.movies.length} movies in the database.
        </h1>
      )
    );
  }

  deleteMovie(selectedMovie) {
    this.setState({
      movies: this.state.movies.filter(
        (movie) => movie._id !== selectedMovie._id
      ),
    });
  }
}

export default Movies;
