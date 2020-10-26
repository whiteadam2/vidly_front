import React from "react";

const Filter = (props) => {
  const {
    items,
    onItemSelected,
    selectedItem,
    textProperty,
    valueProperty,
  } = props;

  return (
    <ul className="list-group">
      <li
        onClick={() => onItemSelected(null)}
        className={"list-group-item " + (selectedItem === null ? "active" : "")}
      >
        All Genres
      </li>

      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelected(item[valueProperty])}
          className={
            "list-group-item " +
            (item[valueProperty] === selectedItem ? "active" : "")
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  textProperty: "title",
  valueProperty: "_id",
};

export default Filter;
