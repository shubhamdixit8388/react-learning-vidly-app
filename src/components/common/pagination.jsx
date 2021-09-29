import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, onItemSelect, selectedItem } = props;
  const noOfPages = Math.ceil(itemsCount / pageSize);
  if (noOfPages < 2) return null;
  const pages = _.range(1, noOfPages + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              onClick={() => onItemSelect(page)}
              className={
                page === selectedItem ? "page-item active" : "page-item"
              }
              key={page}
            >
              <a className="page-link">{page}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
};

export default Pagination;
