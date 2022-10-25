import {
  // useEffect,
  useMemo, useState,
  // useState,
} from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  // const [apiResults, setApiResults] = useState([]);
  // const [endpoint, setEndpoint] = useState()

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
  
  // useEffect(() => {
  //   const requestAPI = async () => {
  //     try {
  //       const response = await fetch(ENDPOINT);
  //       const { results } = await response.json();
  //       setApiResults(results.map((e) => {
  //         delete e.residents;
  //         return e;
  //       }));
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   };
  //   requestAPI();
  // }, []);

  const contexto = useMemo(() => ({
    // apiResults,
  }), [
    // apiResults,
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
