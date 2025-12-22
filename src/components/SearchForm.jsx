import { useState } from "react";

function SearchForm({ onSearch }) {
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

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
    <form onSubmit={handleSubmit}>
        <h3>Search Prpoerties</h3>
        
      <label>
        Property Type:
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </label>

      <br /><br />

      <label>
        Min Price:
        <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}/>
      </label>

      <br /><br />

      <label>
        Max Price:
        <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}/>
      </label>

      <br /><br />

      <label>
        Min Bedrooms:
        <input type="number" value={minBedrooms} onChange={e => setMinBedrooms(e.target.value)} />
      </label>

      <br /><br />

      <label>
        Max Bedrooms:
        <input type="number" value={maxBedrooms} onChange={e => setMaxBedrooms(e.target.value)} />
      </label>

      <br /><br />

      <label>
        Postcode Area:
        <input value={postcode} onChange={e => setPostcode(e.target.value.toUpperCase())} />
      </label>

      <br /><br />

      <label>
        Added After:
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
      </label>

      <br /><br />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
