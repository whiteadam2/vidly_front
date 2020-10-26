import React from "react";

const Header = (props) => {
  return (
    <div className="table-results">
      <span>
        {props.count > 0
          ? `Showing ${props.count} movies in database`
          : "There are no movies in the database"}
      </span>
    </div>
  );
};

export default Header;
