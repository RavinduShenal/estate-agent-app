import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

function PropertyCard({ property, favourites, addFavourite }) {
  const isFavourite = favourites.includes(property.id);

  return (
    <div
      className="property-card"
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData("propertyId", property.id)
      }
    >
      <Link to={`/property/${property.id}`} className="property-link">
        <img src={property.picture} alt={property.type} />

        <div className="property-info">
          <h3>{property.type}</h3>
          <p>{property.location}</p>
          <p>£{property.price.toLocaleString()}</p>
        </div>
      </Link>

      <button
        type="button"
        className="fav-btn"
        disabled={isFavourite}
        onClick={() => addFavourite(property.id)}
      >
        {isFavourite ? "Favourited" : "Add to Favourites"}
      </button>

      {/* NEW: Heart Button */}
        <button 
          className={`fav-heart-btn ${isFavourite ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault(); // Stop clicking the card link
            onToggleFav(property);
          }}
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
    </div>
  );
}

export default PropertyCard;
