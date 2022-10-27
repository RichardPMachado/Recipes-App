import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../Context/AppContext';

export default function RecipeDetails() {
  const params = useParams();
  const context = useContext(AppContext);
  const history = useHistory();
  const [type, setType] = useState();
  useEffect(() => {
    const setRecipeEndpoint = () => {
      const { location: { pathname } } = history;
      const { id } = params;
      return pathname === `/drinks/${id}`
        ? (context.drinksEndpoint('recipe-id', id), setType('drinks'))
        : (context.themeaEndpoint('recipe-id', id), setType('meals'));
    };
    setRecipeEndpoint();
  }, [context, history, params]);

  const ingredientsAndMeasure = (obj) => {
    const measureKeys = Object.keys(obj).filter((key) => key.startsWith('strMeasure'));
    const ingrKeys = Object.keys(obj).filter((key) => key.startsWith('strIngredient'));
    const measures = measureKeys.map((key) => obj[key])
      .filter((iten) => iten !== '' && iten !== null);
    const ingredients = ingrKeys.map((key) => obj[key])
      .filter((iten) => iten !== '' && iten !== null);
    return {
      ingredients,
      measures,
    };
  };

  const renderIngredients = (obj) => {
    const { ingredients, measures } = ingredientsAndMeasure(obj);
    return ingredients.map((iten, index) => (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {iten}
        {' '}
        {measures[index]}
      </li>
    ));
  };

  const renderMealOrDrink = (recipeType) => {
    const recipe = context.apiResults[recipeType][0];
    const sliceUrl = 'https://www.youtube.com/watch?v='.length;
    const videoId = recipeType === 'meals' && recipe.strYoutube.slice(sliceUrl);
    return (
      <div>
        <h3
          data-testid="recipe-title"
        >
          {recipeType === 'meals' ? recipe.strMeal : recipe.strDrink}
        </h3>
        <h4
          data-testid="recipe-category"
        >
          {recipeType === 'meals' ? recipe.strCategory : recipe.strAlcoholic}
        </h4>
        <img
          data-testid="recipe-photo"
          src={ recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
          alt={ recipeType === 'meals' ? recipe.strMeal : recipe.strDrink }
        />
        <ul>
          {renderIngredients(recipe)}
        </ul>
        <div data-testid="instructions">
          {recipe.strInstructions}
        </div>
        {recipeType === 'meals' && (
          <iframe
            data-testid="video"
            title={ recipeType === 'meals' ? recipe.strMeal : recipe.strDrink }
            src={ `https://www.youtube.com/embed/${videoId}` }
          />
        )}
      </div>
    );
  };

  return (
    <div>{context.apiResults[type] ? renderMealOrDrink(type) : 'Loading'}</div>
  );
}
