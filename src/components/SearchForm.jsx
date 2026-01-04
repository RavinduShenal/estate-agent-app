import { useState } from "react";
import "../styles/SearchForm.css";

// State variables for search filters
function SearchForm({ onSearch }) {
    const [type, setType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minBedrooms, setMinBedrooms] = useState("");
    const [maxBedrooms, setMaxBedrooms] = useState("");
    const [postcode, setPostcode] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    
    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();    // Prevent page reload

        // Send search values to parent component
        onSearch({
        type,
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms,
        postcode,
        dateFrom
        });
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <h3>Search Prpoerties</h3>
            
            {/* First row of search inputs */}
            <div className="form-row">

                {/* Property type selection */}
                <label>
                    Property Type:
                    <select value={type} onChange={e => setType(e.target.value)}>
                    <option value="">Any</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                    </select>
                </label>

                {/* Postcode input */}
                <label>
                    Postcode Area:
                    <input value={postcode} onChange={e => setPostcode(e.target.value.toUpperCase())} />
                </label>
            
                {/* Minimum price */}
                <label>
                    Min Price:
                    <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}/>
                </label>

                {/* Maximum price */}
                <label>
                    Max Price:
                    <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}/>
                </label>
            </div>

            {/* Second row of search inputs */}
            <div className="form-row">    

                {/* Minimum bedrooms */}
                <label>
                    Min Bedrooms:
                    <input type="number" value={minBedrooms} onChange={e => setMinBedrooms(e.target.value)} />
                </label>

                {/* Maximum bedrooms */}
                <label>
                    Max Bedrooms:
                    <input type="number" value={maxBedrooms} onChange={e => setMaxBedrooms(e.target.value)} />
                </label>

                {/* Date added filter */}
                <label>
                    Added After:
                    <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                </label>
            </div>

            <button type="submit">Search</button>

        </form>
    );
}

export default SearchForm;
