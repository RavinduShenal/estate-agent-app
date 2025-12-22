import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/PropertyDetails.css";

function PropertyDetails({ properties }) {
  const { id } = useParams();

  const property = properties.find(p => p.id === id);

  if (!property) {
    return <p>Property not found</p>;
  }

  const galleryImages = property.pictures;
  const [mainImage, setMainImage] = useState(galleryImages[0]);

  return (
    <div className="details-container">
      <Link to="/" className="back-link">← Back to search</Link>

      <h2>{property.type}</h2>

      <img
        src={mainImage}
        alt="Property"
        className="details-main-image"
      />

      <div className="thumbnail-row">
        {galleryImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Property image ${index + 1}`}
            className={`thumbnail ${img === mainImage ? "active" : ""}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

      <p className="details-price">
        £{property.price.toLocaleString()}
      </p>

      <p>{property.location}</p>
      <p>{property.description}</p>
    </div>
  );
}

export default PropertyDetails;
