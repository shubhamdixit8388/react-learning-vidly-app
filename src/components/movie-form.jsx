import React from "react";

const MovieForm = (props) => {
  const { match, history } = props;
  return (
    <React.Fragment>
      <h1>Movies from {match.params.id}</h1>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => history.replace("/movies/")}
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
