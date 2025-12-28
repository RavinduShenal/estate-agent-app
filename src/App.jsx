import {useState, useEffect} from "react";
import propertiesData from './data/properties.json';
import PropertyCard from './components/PropertyCard';
import SearchForm from './components/SearchForm';
import { Routes, Route } from "react-router-dom";
import PropertyDetails from "./components/PropertyDetails";
import "./styles/App.css";

function App() {
  const allProperties = propertiesData.properties;
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

useEffect(() => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}, [favourites]);

const toggleFavourite = (property) => {
  const exists = favourites.some(fav => fav.id === property.id);

  if (exists) {
    setFavourites(favourites.filter(fav => fav.id !== property.id));
  } else {
    setFavourites([...favourites, property]);
  }
};

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

      if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) {
        return false;
      }

      if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) {
        return false;
      }

      if (criteria.postcode && !property.postcode.startsWith(criteria.postcode)) {
        return false;
      }

      if (criteria.dateFrom) {
        const propertyDate = new Date(
          `${property.added.month} ${property.added.day}, ${property.added.year}`
        );

        const selectedDate = new Date(criteria.dateFrom);

        if (propertyDate < selectedDate) {
          return false;
        }
      }

      return true;
    });

    setFilteredProperties(results);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page">
            <header className="header">
              <div className="header-content">
                <h1>Estate Agent App</h1>
                <p>Find your next home with ease</p>
              </div>
            </header>

            <main className="content">
              <section className="search-section">
                <SearchForm onSearch={handleSearch} />
              </section>

              <section className="results-section">
                {filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    favourites={favourites}
                    toggleFavourite={toggleFavourite}
                  />
                ))}
              </section>
            </main>
          </div>
        }
      />

      <Route
        path="/property/:id"
        element={<PropertyDetails properties={allProperties} favourites={favourites} toggleFavourite={toggleFavourite}/>}
      />
    </Routes>
  );
}

export default App;
