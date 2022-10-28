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

  const contexto = useMemo(() => ({
    apiResults,
    endpoint,
    filterEndpoint,
    themeaEndpoint,
    drinksEndpoint,
    setEndpoint,
    setFilterEndpoint,
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
