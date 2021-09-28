import React from "react";

class Like extends React.Component {
  render() {
    const { onLikeClick, movie } = this.props;
    return (
      <button
        className={this.buttonColor(movie.liked)}
        onClick={() => onLikeClick(movie)}
      ></button>
    );
  }

  buttonColor(liked) {
    let badgeClass = "like-button btn btn-sm btn-";
    badgeClass += liked ? "danger" : "";
    return badgeClass;
  }
}

export default Like;
