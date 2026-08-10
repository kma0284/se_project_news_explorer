
import { useState } from "react";
import "../blocks/SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-form__form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter topic"
        required
      />

      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
