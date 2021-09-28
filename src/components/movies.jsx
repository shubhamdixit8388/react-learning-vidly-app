import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPageNumber: 1,
  };
  render() {
    const { length: count } = this.state.movies;
    const { movies: allMovies, currentPageNumber, pageSize } = this.state;
    const movies = paginate(allMovies, currentPageNumber, pageSize);

    if (!this.state.movies.length) {
      return <h1 className="m-4">There are no movies in the database.</h1>;
    }
    return (
      <main className="container">
        <h1 className="m-4">Showing {count} movies in the database.</h1>

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
          itemsCount={count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
          currentPageNumber={this.state.currentPageNumber}
        />
      </main>
    );
  }

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
