import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, numberOfItems, pageSize, onPageChange }) => {
  const numberOfPages = Math.ceil(numberOfItems / pageSize);

  if (numberOfPages === 1) return null;

  const pages = _.range(1, numberOfPages + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={"page-item" + (page === currentPage ? " active" : "")}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numberOfItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
