import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import propertiesData from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./components/PropertyDetails";
import FavouritesSidebar from "./components/FavouritesSidebar";
import "./styles/App.css";

function App() {
  const allProperties = propertiesData.properties;

  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  // ✅ FAVOURITES STORED AS PROPERTY IDs
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // ✅ ADD / REMOVE FAVOURITE
  const addFavourite = (id) => {
    if (!favourites.includes(id)) {
      setFavourites([...favourites, id]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter(fav => fav !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  // ✅ SEARCH LOGIC
  function handleSearch(criteria) {
    const results = allProperties.filter(property => {
      if (criteria.type && property.type !== criteria.type) return false;
      if (criteria.minPrice && property.price < criteria.minPrice) return false;
      if (criteria.maxPrice && property.price > criteria.maxPrice) return false;
      if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) return false;
      if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) return false;
      if (criteria.postcode && !property.postcode.startsWith(criteria.postcode)) return false;

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
      <Route
        path="/"
        element={
          <div className="page">

            <header className="header">
              <div className="header-content">
                <h1>Estate Agent App</h1>
                <p>Where modern living meets seamless search. Find your dream home.</p>
              </div>
            </header>

            <main className="content">
              <SearchForm onSearch={handleSearch} />

              <div className="layout">
                {/* PROPERTY RESULTS */}
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

                {/* FAVOURITES SIDEBAR */}
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
