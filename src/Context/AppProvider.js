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
  const [themeaEndpoint, setThemeaEndpoint] = useState('https://www.themealdb.com/api/json/v1/1/search.php?f=f');

  // handleInput = ({ target }) => {
  //   const { name, value } = target;
  //   thisetState({ [name]: value }, () => verifyBtn());
  // };

  //   drinksEndpoint = (filter, toSearch) => {
  //   switch(filter) {
  //     case "Ingredient" :
  //       setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${toSearch}`)
  //       break
  //     case "Name":
  //       setEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${toSearch}`)
  //       break
  //     case "First letter":
  //       setEndpoint( `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${toSearch}`)
  //       break
  //     default :
  //       null
  //   }
  //  }

  const fetchThemeaEndpoint = (filter, toSearch) => {
    switch (filter) {
    case 'ingredient-search':
      return setThemeaEndpoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${toSearch}`);
    case 'name-search':
      return setThemeaEndpoint(`https://www.themealdb.com/api/json/v1/1/search.php?s=${toSearch}`);
    case 'first-letter-search':
      return setThemeaEndpoint(`https://www.themealdb.com/api/json/v1/1/search.php?f=${toSearch}`);
    default:
      return null;
    }
  };

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch(themeaEndpoint);
        const { meals } = await response.json();
        setApiResults(meals);
      } catch (error) {
        throw new Error(error);
      }
    };
    requestAPI();
  }, [themeaEndpoint]);

  const contexto = useMemo(() => ({
    apiResults,
    fetchThemeaEndpoint,
    themeaEndpoint,
  }), [
    apiResults,
    themeaEndpoint,
  ]);
  console.log(contexto);

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
