import {
  useEffect,
  useMemo, useState,
  // useState,
} from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [apiResults, setApiResults] = useState([]);
  // const [drinkEndpoint, setDrinkEndpoint] = useState();
  const [endpoint, setEndpoint] = useState(null);
  const [filterEndpoint, setFilterEndpoint] = useState(null);

  // handleInput = ({ target }) => {
  //   const { name, value } = target;
  //   thisetState({ [name]: value }, () => verifyBtn());
  // };

  const drinksEndpoint = (filter, toSearch) => {
    switch (filter) {
    case 'ingredient-search':
      return setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${toSearch}`);
    case 'name-search':
      return setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${toSearch}`);
    case 'first-letter-search':
      return setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${toSearch}`);
    case 'recipe-id':
      return setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${toSearch}`);
    default:
      return null;
    }
  };

  const themeaEndpoint = (filter, toSearch) => {
    switch (filter) {
    case 'ingredient-search':
      return setEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${toSearch}`);
    case 'name-search':
      return setEndpoint(`https://www.themealdb.com/api/json/v1/1/search.php?s=${toSearch}`);
    case 'first-letter-search':
      return setEndpoint(`https://www.themealdb.com/api/json/v1/1/search.php?f=${toSearch}`);
    case 'recipe-id':
      return setEndpoint(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${toSearch}`);
    default:
      return null;
    }
  };

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setApiResults(data);
      } catch (error) {
        throw new Error(error);
      }
    };
    if (endpoint !== null) {
      requestAPI();
    }
  }, [endpoint, filterEndpoint]);

  const isFavoriteRecipe = (id) => {
    const favoritesRecipes = localStorage.getItem('favoriteRecipes');
    if (favoritesRecipes) {
      const isFavorite = JSON.parse(favoritesRecipes).some((recipe) => recipe.id === id);
      return isFavorite;
    }
    return false;
  };

  const handlerFavoriteRecipe = (recipe, type, isFavorite) => {
    if (!isFavorite) {
      const favoritesRecipes = localStorage.getItem('favoriteRecipes');
      const newFavorite = {
        id: type === 'meals' ? recipe.idMeal : recipe.idDrink,
        type: type === 'meals' ? 'meal' : 'drink',
        nationality: type === 'meals' ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: type === 'meals' ? '' : recipe.strAlcoholic,
        name: type === 'meals' ? recipe.strMeal : recipe.strDrink,
        image: type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      };
      if (favoritesRecipes) {
        console.log('ja existe');
        return localStorage
          .setItem('favoriteRecipes', JSON.stringify([...JSON.parse(favoritesRecipes),
            newFavorite]));
      }
      console.log('primeira entrada');
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    }
  };

  const contexto = useMemo(() => ({
    apiResults,
    endpoint,
    filterEndpoint,
    themeaEndpoint,
    drinksEndpoint,
    setEndpoint,
    setFilterEndpoint,
    isFavoriteRecipe,
    handlerFavoriteRecipe,
  }), [
    apiResults,
    filterEndpoint,
    endpoint,
  ]);

  return (
    <AppContext.Provider value={ contexto }>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
