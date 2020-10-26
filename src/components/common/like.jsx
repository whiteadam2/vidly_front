import React from "react";

const Like = (props) => {
  const { onClick, isLiked } = props;

  return (
    <div>
      <i
        className={"fa fa-heart" + (isLiked ? "" : "-o")}
        aria-hidden="true"
        onClick={onClick}
      ></i>
    </div>
  );
};

export default Like;
