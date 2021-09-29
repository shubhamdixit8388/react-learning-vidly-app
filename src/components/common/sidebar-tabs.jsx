const SidebarTabs = (props) => {
  const { genres, onItemSelect, textProperty, valueProperty, selectedItem } =
    props;
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          className={
            selectedItem.name === genre.name
              ? "list-group-item active"
              : "list-group-item"
          }
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
