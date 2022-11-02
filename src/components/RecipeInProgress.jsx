import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import verifyRecipes from '../assets/verifyRecipes';
// import Button from 'react-bootstrap/Button';
import AppContext from '../Context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import './recipeInProgress.css';

const copy = require('clipboard-copy');

export default function RecipeDetails() {
  const params = useParams();
  const { id } = params;
  const context = useContext(AppContext);
  const history = useHistory();
  const [type, setType] = useState();
  const [linkCopied, setlinkCopied] = useState(false);
  // const [ingredientsLength, setIngredientsLength] = useState(0);
  // const [checkedState, setCheckedState] = useState(
  //   new Array(ingredientsLength).fill(false),
  // );
  useEffect(() => {
    context.isFavoriteRecipe(id);
    const setRecipeEndpoint = () => {
      const { location: { pathname } } = history;
      return pathname === `/drinks/${id}/in-progress`
        ? (context.drinksEndpoint('recipe-id', id), setType('drinks'))
        : (context.themeaEndpoint('recipe-id', id), setType('meals'));
    };
    setRecipeEndpoint();
  }, []);

  // useEffect(() => {
  //   if (type) {
  //     const fetchRecomendations = async (recomendationFor) => {
  //       const ENDPOINT = recomendationFor === 'drinks' ? 'themealdb' : 'thecocktaildb';
  //       const response = await fetch(`https://www.${ENDPOINT}.com/api/json/v1/1/search.php?s=`);
  //       const recomendation = await response.json();
  //       setRecomended(recomendation);
  //     };
  //     fetchRecomendations(type);
  //   }
  // }, [type]);

  const isDoneRecipe = () => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      return JSON.parse(doneRecipes).some((recipe) => recipe.id === id);
    }
  };

  // const checkListIten = (iten) => {
  //   const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  //   const usedItens = JSON.parse(inProgressRecipes);
  //   return usedItens[type][id]?.includes(iten);
  // };

  const storageInProgressRecipe = (iten) => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    const usedItens = JSON.parse(inProgressRecipes);
    const usedItenBool = usedItens[type][id].some((i) => i === iten);
    if (usedItenBool) {
      const index = usedItens[type][id].indexOf(iten);
      usedItens[type][id].splice(index, 1);
      return localStorage.setItem('inProgressRecipes', JSON.stringify(usedItens));
    }
    usedItens[type][id] = [...usedItens[type][id], iten];
    return localStorage.setItem('inProgressRecipes', JSON.stringify(usedItens));
  };

  // const isInProgressRecipes = (recipeType) => {
  //   const inProgressRecipes = localStorage.getItem('inProgressRecipes');
  //   if (inProgressRecipes) {
  //     return Object.keys(JSON.parse(inProgressRecipes)[recipeType])
  //       .some((recipe) => recipe === id);
  //   }
  // };

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

  const handleChecked = (position, iten) => {
    const newChecked = checkedState
      .map((isChecked, index) => (index === position ? !isChecked : isChecked));
    setCheckedState(newChecked);
    storageInProgressRecipe(iten);
  };
  // const verifyConditionClass = (value) => {
  //   if (pathname === `/meals/${id}/in-progress`) {
  //     return inProgressRecipes?.meals[id].some((el) => el === value)
  //       ? 'done'
  //       : '';
  //   }
  //   return inProgressRecipes?.drinks[id].some((el) => el === value)
  //     ? 'done'
  //     : '';
  // };

  const verifyConditionChecked = (value, ingredientes) => !(ingredientes
    .some((el) => el === value));

  const renderIngredients = (obj) => {
    const { ingredients, measures } = ingredientsAndMeasure(obj);

    return ingredients?.map((iten, index) => (
      <div
        key={ index }
      >
        <label
          data-testid={ `${index}-ingredient-step` }
          id={ iten.toLowerCase() }
          htmlFor={ iten.toLowerCase() }
        >
          <input
            data-testid={ `${index}-ingredient-name-and-measure` }
            id={ iten.toLowerCase() }
            type="checkbox"
            onChange={ () => handleChecked(index, iten) }
            defaultChecked={ verifyConditionChecked(iten, ingredients) }
          />
          { ` ${iten} ${measures[index]}` }
        </label>
      </div>
    ));
  };
  const renderMealOrDrink = (recipeType) => {
    const recipe = context.apiResults[recipeType][0];
    const sliceUrl = 'https://www.youtube.com/watch?v='.length;
    const videoId = recipeType === 'meals' && recipe.strYoutube.slice(sliceUrl);
    return (
      <div className="recipeContainer">
        <div className="detailsHeader">
          <h2 data-testid="recipe-title">
            {recipeType === 'meals' ? recipe.strMeal : recipe.strDrink}
          </h2>
          <h4 data-testid="recipe-category">
            {recipeType === 'meals' ? recipe.strCategory : recipe.strAlcoholic}
          </h4>
        </div>
        <div className="imageContent">
          <img
            className="recipeDetailsImg"
            data-testid="recipe-photo"
            src={
              recipeType === 'meals' ? recipe
                .strMealThumb : recipe
                .strDrinkThumb
            }
            alt={ recipeType === 'meals' ? recipe.strMeal : recipe.strDrink }
          />
        </div>
        <div className="ingredients">
          <h4> Ingredientes </h4>
          <section>
            {renderIngredients(recipe)}
          </section>
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
          />)}
        <div className="btnStartRecipe">
          <Link
            to={ {
              pathname: `/${type}/${id}`,
            } }
          >
            <button
              z-index={ 10 }
              style={ { position: 'fixed', bottom: '0' } }
              type="button"
              data-testid="finish-recipe-btn"
              hidden={ isDoneRecipe() }
            >
              Finish Recipe
            </button>
          </Link>
        </div>
        <div className="buttons" style={ { position: 'fixed', top: '0' } }>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              copy(window.location.href);
              setlinkCopied(true);
              setTimeout(() => {
                setlinkCopied(false);
              }, '3000');
            } }
          >
            <img
              src={ shareIcon }
              alt="share-icon"
            />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            src={ context.favorite ? blackHeartIcon : whiteHeartIcon }
            onClick={ () => context.handlerFavoriteRecipe(
              context.apiResults[type][0],
              type,
            ) }
          >
            <img
              src={ context.favorite ? blackHeartIcon : whiteHeartIcon }
              alt="heart-icon"
            />
          </button>
        </div>
        <div>
          {linkCopied ? 'Link copied!' : null}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="detailsContainer">
        {context.apiResults[type] ? renderMealOrDrink(type) : 'Loading'}
      </div>
    </div>
  );
}
