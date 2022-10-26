import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import AppProvider from '../Context/AppProvider';
import AppContext from '../Context/AppContext';

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <AppProvider value={ AppContext }>
          {component}
        </AppProvider>
      </Router>,
    ),
    history,
  });
};
export default renderWithRouterAndContext;
