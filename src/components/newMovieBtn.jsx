import React from "react";

const NewMovieBtn = ({ history }) => {
  return (
    <div className="add-button">
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies/new")}
      >
        Add new movie
      </button>
    </div>
  );
};

export default NewMovieBtn;
