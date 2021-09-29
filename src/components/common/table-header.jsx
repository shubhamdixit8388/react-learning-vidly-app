import React from "react";

class TableHeader extends React.Component {
  raiseSort = (sortBy) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.sortBy === sortBy) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.sortBy = sortBy;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, index) => (
            <th
              key={index}
              scope="col"
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
