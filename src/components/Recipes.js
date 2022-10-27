import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../Context/AppContext';

function Recipes() {
  const MAX_FILTERS = 5;
  const [categoryResults, setCategoryResults] = useState([]);
  const { setFilterEndpoint, setEndpoint } = useContext(AppContext);
  const { location } = useHistory();

  const handleClick = ({ target }) => {
    console.log(target.name);
    setFilterEndpoint(target.name);
  };

  const handleClickAll = () => {
    console.log(null);
    setEndpoint(null);
    setFilterEndpoint(null);
  };

  useEffect(() => {
    const fetchWithLocation = async () => {
      const locationStatus = () => {
        switch (location.pathname) {
        case '/meals':
          return 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        case '/drinks':
          return 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        default:
          return null;
        }
      };

      try {
        const response = await fetch(locationStatus());
        const data = await response.json();
        setCategoryResults(data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchWithLocation();
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
        // name={ null }
      >
        All
      </button>
      {
        categoryResults.meals ? (categoryResults.meals
          .filter((_, index) => index < MAX_FILTERS)
          .map(
            (category) => (
              <button
                key={ category.strCategory }
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ handleClick }
                name={ category.strCategory }
              >
                {
                  category.strCategory
                }
              </button>
            ),
          ))
          : null
      }
      {
        categoryResults.drinks ? (categoryResults.drinks
          .filter((_, index) => index < MAX_FILTERS)
          .map(
            (category, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ handleClick }
                name={ category.strCategory }
              >
                {
                  category.strCategory
                }
              </button>
            ),
          ))
          : null
      }
    </div>
  );
}

export default Recipes;
