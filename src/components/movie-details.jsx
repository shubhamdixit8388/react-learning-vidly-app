import React from "react";

class MovieDetails extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Movies from {this.props.match.params.id}</h1>
        <button className="btn btn-primary btn-sm" onClick={this.onSave}>
          Save
        </button>
      </React.Fragment>
    );
  }

  onSave = () => {
    this.props.history.replace("/movies/");
  };
}

export default MovieDetails;
