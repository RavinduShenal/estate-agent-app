function PropertyCard({ property }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h2>{property.type}</h2>
      <p>{property.location}</p>
      <p><strong>£{property.price}</strong></p>
    </div>
  );
}

export default PropertyCard;
