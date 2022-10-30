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
  const [favorite, setFavorite] = useState(false);

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
      return setFavorite(isFavorite);
    }
    return setFavorite(false);
  };

  const handlerFavoriteRecipe = (recipe, type) => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newfavoriteBool = !favorite;
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
      if (favoritesRecipes.some((e) => e.id === (recipe.idMeal || recipe.idDrink))) {
        const filterFavorite = favoritesRecipes
          .filter((i) => i.id !== (recipe.idMeal || recipe.idDrink));
        setFavorite(newfavoriteBool);
        return localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
      }
      const allFavorite = [...favoritesRecipes, newFavorite];
      setFavorite(newfavoriteBool);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorite));
    }
    setFavorite(newfavoriteBool);
    return localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
  };

  const contexto = useMemo(() => ({
    apiResults,
    endpoint,
    filterEndpoint,
    themeaEndpoint,
    drinksEndpoint,
    setEndpoint,
    setFilterEndpoint,
    handlerFavoriteRecipe,
    isFavoriteRecipe,
    favorite,
  }), [
    apiResults,
    filterEndpoint,
    endpoint,
    favorite,
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
