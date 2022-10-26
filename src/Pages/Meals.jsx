import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../Context/AppContext';

function Meals() {
  const context = useContext(AppContext);
  const renderMeals = () => {
    const { apiResults } = context;
    const MEALSTORENDER = 12;
    if (apiResults.meals) {
      return apiResults.meals.filter((meal, index) => index < MEALSTORENDER)
        .map((meal, key) => (
          <div key={ key } data-testid={ `${key}-recipe-card` }>
            <div data-testid={ `${key}-card-name` }>
              {meal.strMeal}
            </div>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${key}-card-img` }
            />
          </div>
        ));
    }
    return null;
  };
  return (
    <div>
      <Header title="Meals" />
      <Footer />
      {renderMeals()}
    </div>
  );
}
export default Meals;
