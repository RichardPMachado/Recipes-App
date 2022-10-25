import {
  // useEffect,
  useMemo,
  // useState,
} from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  // const [apiResults, setApiResults] = useState([]);

  // handleInput = ({ target }) => {
  //   const { name, value } = target;
  //   thisetState({ [name]: value }, () => verifyBtn());
  // };

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
