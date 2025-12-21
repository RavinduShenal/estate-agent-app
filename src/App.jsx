import propertiesData from './data/properties.json';
import PropertyCard from './components/PropertyCard';

function App() {
  const properties = propertiesData.properties;

  return (
    <div>
      <h1>Estate Agent App</h1>

      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default App;
