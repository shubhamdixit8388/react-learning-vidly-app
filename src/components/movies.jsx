import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movie-service";
import { getGenres } from "../services/genre-service";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SidebarTabs from "./common/sidebar-tabs";
import Table from "./common/table";
import Like from "./common/like";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/search-box";
import { toast } from "react-toastify";
import Auth from "../services/auth-service";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPageNumber: 1,
    selectedGenre: null,
    sortColumn: { sortBy: "title", order: "asc" },
    searchString: "",
  };

  movieColumns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
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
  ];

  deleteColumn = {
    path: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.handleDeleteMovie(movie)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = Auth.getCurrentUser();
    if (user && user.isAdmin) this.movieColumns.push(this.deleteColumn);
  }

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: -999 }, ...data];

    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres,
      selectedGenre: genres[0],
    });
  }

  render() {
    const user = Auth.getCurrentUser();
    const {
      movies: allMovies,
      currentPageNumber,
      pageSize,
      genres,
      selectedGenre,
      sortColumn,
      searchString,
    } = this.state;

    let filteredMovies = allMovies;
    if (searchString) {
      filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchString.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id !== -999) {
      filteredMovies = allMovies.filter(
        (movie) => movie.genre._id === selectedGenre._id
      );
    }
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
            {user && user.isAdmin && (
              <Link to="movies/new">
                <button className="btn btn-primary btn-md">New Movie</button>
              </Link>
            )}
            <h1 className="m-4">
              Showing {filteredMovies.length} movies in the database.
            </h1>
            <SearchBox
              value={searchString}
              onChange={this.handleSearchBoxChange}
            />
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
      this.setState({ selectedGenre, currentPageNumber: 1, searchString: "" });
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

  handleSearchBoxChange = (searchString) => {
    console.log("searchString: ", searchString);
    this.setState({
      searchString,
      selectedGenre: this.state.genres[0],
      currentPageNumber: 1,
    });
  };

  handleDeleteMovie = async (selectedMovie) => {
    const originalMovie = this.state.movies;
    const movies = originalMovie.filter(
      (movie) => movie._id !== selectedMovie._id
    );
    this.setState({ movies });
    try {
      await deleteMovie(selectedMovie._id + "sds");
    } catch (error) {
      const expectedError = error.response && error.response.status === 404;
      if (expectedError) {
        toast.error("Movie doesnt exist with this");
      }
      this.setState({ movies: originalMovie });
    }
  };
}

export default Movies;
