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
          {this.props.tableHeaderTitles.map((title, index) => (
            <th
              key={index}
              scope="col"
              onClick={() => this.raiseSort(title.key)}
            >
              {title.value}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
