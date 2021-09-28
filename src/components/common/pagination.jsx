import React from "react";
import _ from "lodash";

class Pagination extends React.Component {
  render() {
    const { itemsCount, pageSize, onPageChange, currentPageNumber } =
      this.props;
    const noOfPages = Math.ceil(itemsCount / pageSize);
    if (noOfPages < 2) return null;
    const pages = _.range(1, noOfPages + 1);
    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li
                onClick={() => onPageChange(page)}
                className={this.getActiveClass(page, currentPageNumber)}
                key={page}
              >
                <a className="page-link">{page}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  getActiveClass(pageNumber, currentPageNumber) {
    let pageNumberClass = "page-item ";
    pageNumberClass += pageNumber === currentPageNumber ? "active" : "";
    return pageNumberClass;
  }
}

export default Pagination;
