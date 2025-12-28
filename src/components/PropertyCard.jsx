import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

function PropertyCard({ property, favourites, toggleFavourite }) {

  const isFavourite = favourites.includes(property.id);

  return (
    <div className="property-card">

      <button
        type="button"
        className={`fav-btn ${isFavourite ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleFavourite(property.id);
        }}
      >
        ♥
      </button>

      {/* Clickable card content */}
      <Link to={`/property/${property.id}`} className="property-link">
        <img src={property.picture} alt={property.type} />

        <div className="property-info">
          <h3>{property.type}</h3>
          <p>{property.location}</p>
          <p><strong>£{property.price.toLocaleString()}</strong></p>
        </div>
      </Link>

    </div>
  );
}

export default PropertyCard;
