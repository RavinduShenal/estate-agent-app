import propertiesData from './data/properties.json';

function App() {
  const properties = propertiesData.properties;

  return (
    <div>
      <h1>Estate Agent App</h1>

      {properties.map(property => (
        <div key={property.id}>
          <h2>{property.type}</h2>
          <p>{property.location}</p>
          <p>£{property.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
