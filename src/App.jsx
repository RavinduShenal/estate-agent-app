import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import propertiesData from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./components/PropertyDetails";
import FavouritesSidebar from "./components/FavouritesSidebar";
import "./styles/App.css";

function App() {

  // Get all properties from JSON file
  const allProperties = propertiesData.properties;

  // State to store filtered search results
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  // State to store favourite property IDs (loaded from localStorage)
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Add a property to favourites
  const addFavourite = (id) => {
    if (!favourites.includes(id)) {
      setFavourites([...favourites, id]);
    }
  };

  // Remove a property from favourites
  const removeFavourite = (id) => {
    setFavourites(favourites.filter(fav => fav !== id));
  };

  // Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  // Search and filter properties based on criteria
  function handleSearch(criteria) {
    const results = allProperties.filter(property => {
      if (criteria.type && property.type !== criteria.type) return false;
      if (criteria.minPrice && property.price < criteria.minPrice) return false;
      if (criteria.maxPrice && property.price > criteria.maxPrice) return false;
      if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) return false;
      if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) return false;
      if (criteria.postcode && !property.postcode.startsWith(criteria.postcode)) return false;

      // Filter by date added
      if (criteria.dateFrom) {
        const propertyDate = new Date(
          `${property.added.month} ${property.added.day}, ${property.added.year}`
        );
        const selectedDate = new Date(criteria.dateFrom);
        if (propertyDate < selectedDate) return false;
      }

      return true;
    });

    setFilteredProperties(results);
  }

  return (
    <Routes>
      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <div className="page">

            {/* Header section */}
            <header className="header">
              <div className="header-content">
                <h1>Estate Agent App</h1>
                <p>Where modern living meets seamless search. Find your dream home.</p>
              </div>
            </header>

            {/* Main content */}
            <main className="content">
              {/* Search form */}
              <SearchForm onSearch={handleSearch} />

              <div className="layout">
                {/* Property results list */}
                <section className="results-section">
                  {filteredProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      favourites={favourites}
                      addFavourite={addFavourite}
                      removeFavourite={removeFavourite}
                    />
                  ))}
                </section>

                {/* Favourites sidebar */}
                <FavouritesSidebar
                  favourites={favourites}
                  properties={allProperties}
                  onRemove={removeFavourite}
                  onClear={clearFavourites}
                  onDrop={addFavourite}
                />
              </div>
            </main>
          </div>
        }
      />

      {/* PROPERTY DETAILS PAGE */}
      <Route
        path="/property/:id"
        element={
          <PropertyDetails
            properties={allProperties}
            favourites={favourites}
            addFavourite={addFavourite}
            removeFavourite={removeFavourite}
          />
        }
      />
    </Routes>
  );
}

export default App;
