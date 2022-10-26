import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../Context/AppContext';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState();
  const [filters, setFilters] = useState();
  const history = useHistory();
  const context = useContext(AppContext);
  console.log(context.apiResults.meals);
  useEffect(() => {
    const redirect = () => {
      const { apiResults } = context;
      if (apiResults.drinks) {
        const { drinks } = apiResults;
        return apiResults.drinks.length === 1
          && history.push(`/drinks/${drinks[0].idDrink}`);
      }
      if (apiResults.meals) {
        const { meals } = apiResults;
        return apiResults.meals.length === 1
          && history.push(`/meals/${meals[0].idMeal}`);
      }
    };
    redirect();
  }, [context, history]);

  const handleValidationFilter = () => {
    const { location: { pathname } } = history;
    if (searchValue.length > 1 && filters === 'first-letter-search') {
      return global.alert('Your search must have only 1 (one) character');
    }
    return pathname === '/drinks' ? context.drinksEndpoint(filters, searchValue)
      : context.themeaEndpoint(filters, searchValue);
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
        SEARCH
      </button>
    </div>
  );
}
