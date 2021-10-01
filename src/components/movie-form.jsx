import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStocks: "",
      rate: "",
      genre: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    title: Joi.string().label("Title").required(),
    genre: Joi.string().label("Genre").required(),
    numberInStocks: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .label("Title")
      .required(),
    rate: Joi.string().min(0).max(10).label("Rate").required(),
  };

  componentDidMount() {
    const genres = getGenres();
    const data = { ...this.state.data };
    data.genre = genres && genres.length ? genres[0]._id : "";
    this.setState({
      genres,
      data,
    });
  }

  doSubmit = () => {
    this.props.history.replace("/movies");
  };

  render() {
    const { match, history } = this.props;
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            "genre",
            "Genre",
            this.state.genres,
            "_id",
            "name"
          )}
          {this.renderInput("numberInStocks", "Numer In stocks")}
          {this.renderInput("rate", "Rate")}
          {this.renderSubmitButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
