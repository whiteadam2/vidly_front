import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ currentSort, onSort, columns, items }) => {
  return (
    <table className="table">
      <TableHeader
        currentSort={currentSort}
        onSort={onSort}
        columns={columns}
      />

      <TableBody items={items} columns={columns} />
    </table>
  );
};

export default Table;
