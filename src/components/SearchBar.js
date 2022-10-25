import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="search"
          id="search-input"
          data-testid="search-input"
          placeholder="Search"
        />
      </label>
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
        />
        First letter
      </label>
      <button type="button" data-testid="exec-search-btn">SERACH</button>
    </div>
  );
}
