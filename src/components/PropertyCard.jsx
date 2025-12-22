import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property.id}`} className="property-link">
        <div className="property-card">
            <img src={property.picture} alt={property.type} />

            <div className="property-info">
                <h3>{property.type}</h3>
                <p>{property.location}</p>
                <p><strong>£{property.price.toLocaleString()}</strong></p>
                <p>{property.bedrooms} bedrooms</p>
            </div>
        </div>
    </Link>    
  );
}

export default PropertyCard;
