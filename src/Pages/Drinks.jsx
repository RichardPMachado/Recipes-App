
import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../Context/AppContext';

export default function Drinks() {
  const context = useContext(AppContext);
  const renderDrinks = () => {
    const { apiResults } = context;
    const DRINKSTORENDER = 12;
    if (context.apiResults.drinks) {
      return apiResults.drinks.filter((drink, index) => index < DRINKSTORENDER)
        .map((drink, key) => (
          <div key={ key } data-testid={ `${key}-recipe-card` }>
            <div data-testid={ `${key}-card-name` }>
              {drink.strDrink}
            </div>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${key}-card-img` }
            />
          </div>
        ));
    }
    return null;
  };
  return (
    <div>
      <Header title="Drinks" />
      <Footer />
      {renderDrinks()}

    </div>
  );
}
