import Like from "./like";

const Table = (props) => {
  const { items, onLikeClick, onDelete, headerTitles } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          {headerTitles.map((title, index) => (
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
              <th>{item.title}</th>
              <td>{item.genre.name}</td>
              <td>{item.numberInStock}</td>
              <td>{item.dailyRentalRate}</td>
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
