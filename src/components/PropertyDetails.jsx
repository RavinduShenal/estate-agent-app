import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/PropertyDetails.css";

function PropertyDetails({ properties, favourites, toggleFavourite }) {
  const { id } = useParams();

  // 1️⃣ Find the property FIRST
  const property = properties.find(p => p.id === id);

  // 2️⃣ Guard clause (very important)
  if (!property) {
    return <p>Property not found</p>;
  }

  // 3️⃣ NOW it is safe to use property
  const [mainImage, setMainImage] = useState(property.pictures[0]);
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="details-container">
      <Link to="/" className="back-link">← Back to search</Link>

      <h2>{property.type}</h2>

      <button
        className={`fav-btn ${favourites.includes(property.id) ? "active" : ""}`}
        onClick={() => toggleFavourite(property.id)}
      >
        ❤️
      </button>

      <img
        src={mainImage}
        alt="Property"
        className="details-main-image"
      />

      <div className="thumbnail-row">
        {property.pictures.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Property ${index}`}
            className={`thumbnail ${img === mainImage ? "active" : ""}`}
            onClick={() => setMainImage(img)}
          />
        ))}
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
          Map
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "description" && (
          <p>{property.description}</p>
        )}

        {activeTab === "floorplan" && (
          <img
            src={`/images/${property.id}_floorplan.jpg`}
            alt="Floor plan"
            className="floorplan-image"
          />
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
