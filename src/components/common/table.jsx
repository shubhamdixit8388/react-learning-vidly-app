import Like from "./like";

const Table = (props) => {
  const { items, onLikeClick, onDelete, tableHeaderTitles, tableKeys } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          {tableHeaderTitles.map((title, index) => (
            <th key={index} scope="col">
              {title}
            </th>
          ))}
        </tr>
      </thead>
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
};

export default Table;
