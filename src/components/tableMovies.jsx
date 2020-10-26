import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import Like from "./common/like";
import auth from "../services/authService";

class TableMovies extends Component {
  constructor() {
    super();

    this.columns = [
      {
        path: "title",
        text: "Title",
        content: (movie) => (
          <Link to={"/movies/" + movie._id}>{movie.title}</Link>
        ),
      },

      { path: "genre.title", text: "Genre" },
      { path: "numberInStock", text: "Stock" },
      { path: "dailyRentalRate", text: "Rate" },
      {
        key: "Like",
        content: (movie) => (
          <Like
            isLiked={movie.isLiked}
            onClick={() => this.props.onLike(movie._id)}
          />
        ),
      },
    ];

    this.deleteColumn = {
      key: "Delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    };

    const user = auth.getCurrentUser();

    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onSort, currentSort } = this.props;

    return (
      <Table
        currentSort={currentSort}
        onSort={onSort}
        columns={this.columns}
        items={movies}
      />
    );
  }
}

export default TableMovies;
