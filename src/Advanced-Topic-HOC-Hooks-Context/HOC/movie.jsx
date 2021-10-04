import React, { Component } from "react";
import withTooltip from "./with-tooltip";

class Movie extends Component {
  render() {
    return (
      <React.Fragment>
        <div>Movie</div>
        {this.props.showTooltip && <div>Something Shown</div>}
      </React.Fragment>
    );
  }
}

export default withTooltip(Movie);
