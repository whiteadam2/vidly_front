import React from "react";

const Search = ({ ...rest }) => {
  return (
    <input
      type="text"
      className="form-control my-4"
      placeholder="Search..."
      {...rest}
    ></input>
  );
};

export default Search;
