import {useState} from "react";
import propertiesData from './data/properties.json';
import PropertyCard from './components/PropertyCard';
import SearchForm from './components/SearchForm';

function App() {
  const allProperties = propertiesData.properties;
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  function handleSearch(criteria) {
    const results = allProperties.filter(property => {
      if (criteria.type && property.type !== criteria.type) {
        return false;
      }

      if (criteria.minPrice && property.price < criteria.minPrice) {
        return false;
      }

      if (criteria.maxPrice && property.price > criteria.maxPrice) {
        return false;
      }

      return true;
    });

    setFilteredProperties(results);
  }

  return (
    <div>
      <h1>Estate Agent App</h1>

      <SearchForm onSearch={handleSearch}/>

      {filteredProperties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default App;
