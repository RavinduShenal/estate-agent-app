import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/PropertyDetails.css";

function PropertyDetails({ properties, favourites, toggleFavourite }) {
  const { id } = useParams();

  const property = properties.find(p => p.id === id);

  if (!property) {
    return <p>Property not found</p>;
  }

  const isFavourite = favourites.some(fav => fav.id === property.id);
  const [mainImage, setMainImage] = useState(property.pictures[0]);
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="details-page">

      <Link to="/" className="back-link">← Back to Search</Link>

      {/* Top section */}
      <div className="details-top">

        {/* LEFT: Images */}
        <div className="details-images">
          <img
            src={mainImage}
            alt={property.type}
            className="main-image"
          />

          <div className="thumbnail-row">
            {property.pictures.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${img === mainImage ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="details-summary">
          <h2>{property.location}</h2>
          <p className="price">£{property.price.toLocaleString()}</p>

          <button
            className={`fav-save-btn ${isFavourite ? "saved" : ""}`}
            onClick={() => toggleFavourite(property)}
          >
            {isFavourite ? "✓ Saved to Favourites" : "♡ Save to Favourites"}
          </button>

          <div className="badges">
            <span>{property.type}</span>
            <span>{property.bedrooms} Bedrooms</span>
            <span>{property.tenure}</span>
          </div>

          <p className="added-date">
            Added: {property.added.month} {property.added.day}, {property.added.year}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>

        <button
          className={activeTab === "floorplan" ? "active" : ""}
          onClick={() => setActiveTab("floorplan")}
        >
          Floor Plan
        </button>

        <button
          className={activeTab === "map" ? "active" : ""}
          onClick={() => setActiveTab("map")}
        >
          Google Map
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "description" && (
          <p>{property.description}</p>
        )}

        {activeTab === "floorplan" && (
            property.id
                ? <img src={`/images/${property.id}_floorplan.jpg`} alt="Floor plan" />
                : <p><em>Floor plan not available</em></p>
        )}

        {activeTab === "map" && (
          <iframe
            title="map"
            src={`https://www.google.com/maps?q=${property.postcode}&output=embed`}
            className="map-frame"
          ></iframe>
        )}
      </div>

    </div>
  );
}

export default PropertyDetails;
