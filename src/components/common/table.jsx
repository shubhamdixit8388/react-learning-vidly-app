import React from "react";
import Like from "./like";
import TableHeader from "./table-header";

class Table extends React.Component {
  render() {
    const {
      items,
      onLikeClick,
      onDelete,
      tableHeaderTitles,
      tableKeys,
      onSort,
      sortColumn,
    } = this.props;
    return (
      <table className="table">
        <TableHeader
          tableHeaderTitles={tableHeaderTitles}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.title}>
                {tableKeys.map((key) => (
                  <th key={key}>{item[key]}</th>
                ))}
                <td>{item.genre.name}</td>
                <td>
                  <Like
                    liked={item.liked}
                    onLikeClick={onLikeClick}
                    movie={item}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
