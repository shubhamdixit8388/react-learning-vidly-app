const SidebarTabs = (props) => {
  const { genres, onItemSelect, textProperty, valueProperty, selectedItem } =
    props;
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          className={
            selectedItem.name === genre.name
              ? "list-group-item active"
              : "list-group-item"
          }
          key={genre[valueProperty]}
          onClick={() => onItemSelect(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

SidebarTabs.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default SidebarTabs;
