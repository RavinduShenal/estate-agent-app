import "../styles/FavouritesSidebar.css";

function FavouritesSidebar({ favourites, properties, onRemove, onClear, onDrop }) {
  const favouriteProperties = properties.filter(p =>
    favourites.includes(p.id)
  );

  return (
    <aside
      className="favourites-sidebar"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("propertyId");
        if (id) onDrop(id);
      }}
    >
      <h3>Favourites</h3>

      {favouriteProperties.length === 0 && (
        <p>Drag properties here</p>
      )}

      {favouriteProperties.map(property => (
        <div
          key={property.id}
          className="favourite-item"
          draggable
          onDragEnd={() => onRemove(property.id)}
        >
          <span>
            {property.type} – £{property.price.toLocaleString()}
          </span>
          <button onClick={() => onRemove(property.id)}>Remove</button>
        </div>
      ))}

      {favouriteProperties.length > 0 && (
        <button className="clear-btn" onClick={onClear}>
          Clear Favourites
        </button>
      )}
    </aside>
  );
}

export default FavouritesSidebar;
