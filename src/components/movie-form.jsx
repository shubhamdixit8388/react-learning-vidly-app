import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().label("Title").required(),
    genreId: Joi.string().label("Genre").required(),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .label("Number In Stock")
      .required(),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate").required(),
  };

  componentDidMount() {
    const genres = getGenres();
    let data = { ...this.state.data };
    data.genreId = genres && genres.length ? genres[0]._id : "";
    const movieId = this.props.match.params.id;
    if (movieId === "new") {
      this.setState({ genres, data });
      return;
    }

    const movie = getMovie(this.props.match.params.id);
    if (!movie) return this.props.history.replace("/not-found");
    console.log(movie);
    data._id = movie._id;
    data.title = movie.title;
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;
    data.genreId = movie.genre._id;

    this.setState({
      genres,
      data,
    });
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.replace("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            "genreId",
            "Genre",
            this.state.genres,
            "_id",
            "name"
          )}
          {this.renderInput("numberInStock", "Numer In stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderSubmitButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
