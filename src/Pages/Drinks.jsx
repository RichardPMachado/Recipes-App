import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../Context/AppContext';
import Recipes from '../components/Recipes';

export default function Drinks() {
  const context = useContext(AppContext);
  if (context.endpoint === null || context.endpoint.includes('https://www.themealdb.com/api/json/v1/1/')) {
    context.setEndpoint('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }
  if (context.filterEndpoint !== null) {
    context.setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${context.filterEndpoint}`);
  }

  const renderDrinks = () => {
    const { apiResults } = context;
    const DRINKSTORENDER = 12;
    if (context.apiResults.drinks) {
      return apiResults.drinks.filter((_, index) => index < DRINKSTORENDER)
        .map((drink, key) => (
          <Link
            data-testid={ `${key}-recipe-card` }
            to={ { pathname: `/drinks/${drink.idDrink}` } }
            key={ key }
          >
            <div>
              <div data-testid={ `${key}-card-name` }>
                {drink.strDrink}
              </div>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
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
      <Header title="Drinks" />
      <Footer />
      <Recipes />
      {renderDrinks()}

    </div>
  );
}
