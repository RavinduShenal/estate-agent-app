import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

function PropertyCard({ property, favourites, addFavourite, removeFavourite }) {
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
        <div className="image-wrapper">
            <img src={property.picture} alt={property.type} />
        </div>

        <div className="property-info">
          <h3>{property.type}</h3>
          <p className="location">{property.location}</p>
          <p className="price">£{property.price.toLocaleString()}</p>
        </div>
      </Link>

      <button
        type="button"
        className={`fav-btn ${isFavourite ? "active" : ""}`}
        onClick={(e) =>{
            e.preventDefault();
            e.stopPropagation();

            if (isFavourite) {
            removeFavourite(property.id);
            } else {
            addFavourite(property.id);
            }
        }}
      >
        {isFavourite ? "♥" : "♡"}
      </button>
    </div>
  );
}

export default PropertyCard;
