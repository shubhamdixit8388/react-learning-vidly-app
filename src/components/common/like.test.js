import { getByTestId } from "@testing-library/dom";
import Like from "./like";
import { render } from "@testing-library/react";
import { ignore } from "joi-browser";

describe("Like Component", () => {
  let movie;
  let container;
  let button;

  const handleLikeClick = (updateMovie) => {
    updateMovie.liked = !updateMovie.liked;
  };

  beforeEach(() => {
    movie = { liked: false };
    container = render(
      <Like movie={movie} onLikeClick={handleLikeClick} />
    ).container;
    button = getByTestId(container, "likeUnlikeButton");
  });

  it("should be 'btn-danger' class applied if mock 'movie.value' is true", () => {
    if (movie.liked) {
      expect(button).toHaveClass("btn-danger");
    } else {
      expect(button).not.toHaveClass("btn-danger");
    }
  });

  it("should be change status on button click", () => {
    const { liked } = movie;
    console.log(liked);
    button.click(() => {
      handleLikeClick(movie);
    });
    console.log(liked);
    console.log(movie.liked);
    expect(movie.liked).toBe(!liked);
  });
});
