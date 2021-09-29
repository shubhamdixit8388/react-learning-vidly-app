import React from "react";
import _ from "lodash";

class TableBody extends React.Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.title}>
              {columns.map((column) => (
                <th key={column.path}>{this.renderCell(item, column)}</th>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
