import { Link } from "react-router-dom";
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
        <p className="empty-message">Drag properties here</p>
      )}

      <div className="favourites-list">
        {favouriteProperties.map(property => (
          
          /* CLICKABLE → PROPERTY DETAILS */
          <Link
            to={`/property/${property.id}`}
            key={property.id}
            className="favourite-item"
            draggable
            onDragEnd={() => onRemove(property.id)}
          >
            <img
              src={property.pictures[0]}
              alt={property.type}
              className="favourite-image"
            />

            <div className="favourite-info">
              <h4 className="favourite-location">{property.location}</h4>
              <p className="favourite-price">
                £{property.price.toLocaleString()}
              </p>
              <p className="favourite-type">
                {property.bedrooms} bed {property.type}
              </p>

              {/* REMOVE → NO NAVIGATION */}
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove(property.id);
                }}
              >
                Remove
              </button>
            </div>
          </Link>
        ))}
      </div>

      {favouriteProperties.length > 0 && (
        <button className="clear-btn" onClick={onClear}>
          Clear Favourites
        </button>
      )}
    </aside>
  );
}

export default FavouritesSidebar;
