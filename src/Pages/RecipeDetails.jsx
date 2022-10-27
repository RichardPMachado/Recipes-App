import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../Context/AppContext';

export default function RecipeDetails() {
  const params = useParams();
  const context = useContext(AppContext);
  const history = useHistory();
  const [type, setType] = useState();
  const [recomended, setRecomended] = useState();

  console.log(recomended);

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

  useEffect(() => {
    const fetchRecomendations = async (recomendationFor) => {
      const ENDPOINT = recomendationFor === 'drinks' ? 'themealdb' : 'thecocktaildb';
      const response = await fetch(`https://www.${ENDPOINT}.com/api/json/v1/1/search.php?s=`);
      const recomendation = await response.json();
      setRecomended(recomendation);
    };
    fetchRecomendations(type);
  }, [type]);

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

  const renderRecomendedItens = (recipeType) => {
    const recomendationToRender = 6;
    recipeType = recipeType === 'drinks' ? 'meals' : 'drinks';
    return recomended[recipeType].map((iten, index) => index < recomendationToRender && (
      <div
        key={ index }
        data-testid={ `${index}-recommendation-card` }
        className="recommendationcard"
      >
        <h4
          data-testid={ `${index}-recommendation-title` }
        >
          {recipeType === 'meals' ? iten.strMeal : iten.strDrink}
        </h4>
        <img
          className="recomendedDetailsImg"
          data-testid="recipe-photo"
          src={ recipeType === 'meals' ? iten.strMealThumb : iten.strDrinkThumb }
          alt={ recipeType === 'meals' ? iten.strMeal : iten.strDrink }
        />
      </div>
    ));
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
      <div className="recipeContainer">
        <div className="detailsHeader">
          <h2
            data-testid="recipe-title"
          >
            {recipeType === 'meals' ? recipe.strMeal : recipe.strDrink}
          </h2>
          <h4
            data-testid="recipe-category"
          >
            {recipeType === 'meals' ? recipe.strCategory : recipe.strAlcoholic}
          </h4>
        </div>
        <div className="imageContent">
          <img
            className="recipeDetailsImg"
            data-testid="recipe-photo"
            src={ recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ recipeType === 'meals' ? recipe.strMeal : recipe.strDrink }
          />
        </div>
        <div className="ingredients">
          <h4> Ingredientes </h4>
          <ul>
            {renderIngredients(recipe)}
          </ul>
        </div>
        <div className="instructions">
          <h4> Modo de preparo </h4>
          <p data-testid="instructions">
            {recipe.strInstructions}
          </p>
        </div>
        {recipeType === 'meals' && (
          <iframe
            data-testid="video"
            title={ recipeType === 'meals' ? recipe.strMeal : recipe.strDrink }
            src={ `https://www.youtube.com/embed/${videoId}` }
          />
        )}
        <div className="recomendationContainer">
          {renderRecomendedItens(recipeType)}
        </div>
      </div>
    );
  };

  return (
    <div className="detailsContainer">
      {context.apiResults[type] ? renderMealOrDrink(type) : 'Loading'}
    </div>
  );
}
