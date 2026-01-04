import { Link } from "react-router-dom";
import "../styles/FavouritesSidebar.css";

// Get only the properties that are marked as favourites
function FavouritesSidebar({ favourites, properties, onRemove, onClear, onDrop }) {
  const favouriteProperties = properties.filter(p =>
    favourites.includes(p.id)
  );

  return (
    <aside
      className="favourites-sidebar"
      onDragOver={(e) => e.preventDefault()}     // Allow items to be dragged over the sidebar
      onDrop={(e) => {                           // Handle drop to add property to favourites
        const id = e.dataTransfer.getData("propertyId");
        if (id) onDrop(id);
      }}
    >
      <h3>Favourites</h3>

      {/* Show message when no favourites exist */}
      {favouriteProperties.length === 0 && (
        <p className="empty-message">Drag properties here</p>
      )}

      <div className="favourites-list">
        {favouriteProperties.map(property => (
          
            // Clicking this item opens property details page
            <Link
              to={`/property/${property.id}`}
              key={property.id}
              className="favourite-item"
              draggable
              onDragEnd={() => onRemove(property.id)}             // Remove favourite when dragged out
            >
            
            {/* Property image */}
            <img
              src={property.pictures[0]}
              alt={property.type}
              className="favourite-image"
            />

            <div className="favourite-info">
              <h4 className="favourite-location">{property.location}</h4>      {/* Property location */}
              <p className="favourite-price">
                £{property.price.toLocaleString()}         {/* Property price */}
              </p>
              <p className="favourite-type">
                {property.bedrooms} bed {property.type}    {/* Property type and bedrooms */}
              </p>

              {/* Remove Button*/}
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

      {/* Clear all favourites button */}
      {favouriteProperties.length > 0 && (
        <button className="clear-btn" onClick={onClear}>
          Clear Favourites
        </button>
      )}
    </aside>
  );
}

export default FavouritesSidebar;
