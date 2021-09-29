import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SidebarTabs from "./common/sidebar-tabs";
import Table from "./common/table";
import Like from "./common/like";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPageNumber: 1,
    selectedGenre: null,
    sortColumn: { sortBy: "title", order: "asc" },
  };

  movieColumns = [
    { path: "title", label: "Title" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { path: "genre.name", label: "Genre" },
    {
      path: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLikeClick={() => this.handleLikeClick(movie)}
          movie={movie}
        />
      ),
    },
    {
      path: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.handleDeleteMovie(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: -999 }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre: genres[0],
    });
  }

  render() {
    const {
      movies: allMovies,
      currentPageNumber,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id !== -999
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;
    let movies = _.orderBy(filteredMovies, sortColumn.sortBy, sortColumn.order);
    movies = paginate(movies, currentPageNumber, pageSize);

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
            <Table
              items={movies}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              column={this.movieColumns}
            />
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDeleteMovie = (selectedMovie) => {
    console.log(selectedMovie);
    this.setState({
      movies: this.state.movies.filter(
        (movie) => movie._id !== selectedMovie._id
      ),
    });
  };
}

export default Movies;
