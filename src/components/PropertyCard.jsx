import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

function PropertyCard({ property, favourites, addFavourite, removeFavourite }) {
  const isFavourite = favourites.includes(property.id);  // Check if this property is already in favourites

  return (
      <div
        className="property-card"
        draggable
        onDragStart={(e) =>
          e.dataTransfer.setData("propertyId", property.id)
        }
      >

      {/* Clicking the card opens property details */}
      <Link to={`/property/${property.id}`} className="property-link">
        {/* Property image */}
        <div className="image-wrapper">
            <img src={property.picture} alt={property.type} />
        </div>

        {/* Property basic details */}
        <div className="property-info">
          <h3>{property.type}</h3>
          <p className="location">{property.location}</p>
          <p className="price">£{property.price.toLocaleString()}</p>
        </div>
      </Link>

      {/* Favourite / Unfavourite button */}
      <button
        type="button"
        className={`fav-btn ${isFavourite ? "active" : ""}`}
        onClick={(e) =>{
            e.preventDefault();
            e.stopPropagation();

            // Add or remove from favourites
            if (isFavourite) {
            removeFavourite(property.id);
            } else {
            addFavourite(property.id);
            }
        }}
      >
        {/* Heart icon changes based on favourite status */}
        {isFavourite ? "♥" : "♡"}
      </button>
    </div>
  );
}

export default PropertyCard;
