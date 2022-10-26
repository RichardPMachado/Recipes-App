import React, { useContext, useState } from 'react';
import AppContext from '../Context/AppContext';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState();
  const [filters, setFilters] = useState();

  const context = useContext(AppContext);

  const handleValidationFilter = () => {
    if (searchValue.length > 1 && filters === 'first-letter-search') {
      return global.alert('Your search must have only 1 (one) character');
    }
    context.fetchThemeaEndpoint(filters, searchValue);
  };

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          id="search-input"
          data-testid="search-input"
          placeholder="Search"
          onChange={ ({ target }) => setSearchValue(target.value) }

        />
      </label>
      <label htmlFor="ingredient-search">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search"
          name="radio-input"
          onClick={ ({ target }) => setFilters(target.id) }
        />
        Ingredient
      </label>
      <label htmlFor="name-search">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name-search"
          name="radio-input"
          onClick={ ({ target }) => setFilters(target.id) }
        />
        Name
      </label>
      <label htmlFor="first-letter-search">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search"
          name="radio-input"
          onClick={ ({ target }) => setFilters(target.id) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleValidationFilter }
      >
        SERACH
      </button>
    </div>
  );
}
