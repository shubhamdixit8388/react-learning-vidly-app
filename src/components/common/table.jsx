import React from "react";
import TableBody from "./table-body";
import TableHeader from "./table-header";

class Table extends React.Component {
  render() {
    const { items, onSort, sortColumn, column } = this.props;
    return (
      <table className="table">
        <TableHeader columns={column} onSort={onSort} sortColumn={sortColumn} />
        <TableBody columns={column} data={items} />
      </table>
    );
  }
}

export default Table;
