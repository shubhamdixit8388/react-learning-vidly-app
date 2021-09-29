import React from "react";

const Like = (props) => {
  const { onLikeClick, movie } = props;
  return (
    <button
      className={"like-button btn btn-sm btn-" + (movie.liked && "danger")}
      onClick={() => onLikeClick(movie)}
    ></button>
  );
};

export default Like;
