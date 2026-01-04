import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/PropertyDetails.css";

function PropertyDetails({ properties, favourites, addFavourite, removeFavourite }) {

  // Get the property ID from the URL
  const { id } = useParams();
  
  // Find the selected property using the ID
  const property = properties.find(p => p.id === id);

  // Show message if property is not found
  if (!property) {
    return <p>Property not found</p>;
  }

  const isFavourite = favourites.includes(property.id);                // Check if property is in favourites
  const [mainImage, setMainImage] = useState(property.pictures[0]);    // State for main image display
  const [activeTab, setActiveTab] = useState("description");           // State for active tab
 
  return (
    <div className="details-page">

      {/* Back to search page */}
      <Link to="/" className="back-link">← Back to Search</Link>

      {/* Top section */}
      <div className="details-top">

        {/* Left side : Images */}
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

        {/* Right side : Summary */}
        <div className="details-summary">
          <h2>{property.location}</h2>
          <p className="price">£{property.price.toLocaleString()}</p>

          {/* Favourite button */}
          <button
            type="button"
            className={`fav-btn ${isFavourite ? "active" : ""}`}
            onClick={(e) => {
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

          {/* Property details */}
          <div className="badges">
            <span>{property.type}</span>
            <span>{property.bedrooms} Bedrooms</span>
            <span>{property.tenure}</span>
          </div>

          {/* Date added */}
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
