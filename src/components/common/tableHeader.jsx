import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const newSort = { ...this.props.currentSort };

    if (path === newSort.path) {
      newSort.order === "asc"
        ? (newSort.order = "desc")
        : (newSort.order = "asc");
    } else {
      newSort.path = path;
      newSort.order = "asc";
    }

    this.props.onSort(newSort);
  };

  renderCell = (column) => {
    if (column.text) {
      return (
        <th key={column.path} onClick={() => this.raiseSort(column.path)}>
          {column.text} {this.renderSortIcons(column)}
        </th>
      );
    } else {
      return <th key={column.key}></th>;
    }
  };

  renderSortIcons = (column) => {
    const { currentSort } = this.props;

    if (column.path !== currentSort.path) return null;
    else {
      if (currentSort.order === "asc")
        return <i className="fa fa-sort-asc"></i>;
      else return <i className="fa fa-sort-desc"></i>;
    }
  };

  render() {
    return (
      <thead>
        <tr>{this.props.columns.map((column) => this.renderCell(column))}</tr>
      </thead>
    );
  }
}

export default TableHeader;
