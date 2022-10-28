import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../Context/AppContext';
import Recipes from '../components/Recipes';

function Meals() {
  const { endpoint, filterEndpoint, setEndpoint } = useContext(AppContext);
  if (endpoint === null || endpoint.includes('https://www.thecocktaildb.com/api/json/v1/1')) {
    setEndpoint('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  }
  if (filterEndpoint !== null) {
    setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterEndpoint}`);
  }
  const context = useContext(AppContext);
  const renderMeals = () => {
    const { apiResults } = context;
    const MEALSTORENDER = 12;
    if (apiResults.meals) {
      return apiResults.meals.filter((meal, index) => index < MEALSTORENDER)
        .map((meal, key) => (
          <Link
            data-testid={ `${key}-recipe-card` }
            to={ { pathname: `/meals/${meal.idMeal}` } }
            key={ key }
          >
            <div
              id={ meal.idMeal }
            >
              <div data-testid={ `${key}-card-name` }>
                {meal.strMeal}
              </div>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${key}-card-img` }
                width="350"
              />
            </div>
          </Link>
        ));
    }
    return null;
  };
  return (
    <div>
      <Header title="Meals" />
      <Footer />
      <Recipes />
      {renderMeals()}
    </div>
  );
}
export default Meals;
