import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (column, item) => {
    return column.content ? column.content(item) : _.get(item, column["path"]);
  };

  render() {
    const { items, columns } = this.props;

    return (
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={column.path || column.key}>
                {this.renderCell(column, item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
