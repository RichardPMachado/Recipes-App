import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event';
// import SearchBar from '../components/SearchBar';
import renderWithRouterAndContext from './helper/renderWithRouterAndContext';
import Meals from '../Pages/Meals';

// const getElement = ((scr) => {
//   const searchImput = scr.getByTestId('search-input');
//   const ingredientRadio = scr.getByTestId('ingredient-search-radio');
//   const nameRadio = scr.getByTestId('name-search-radio');
//   const firstLetterRadio = scr.getByTestId('first-letter-search-radio');
//   const searchButton = scr.getByTestId('exec-search-btn');

//   return {
//     searchImput,
//     ingredientRadio,
//     nameRadio,
//     firstLetterRadio,
//     searchButton,
//   };
// });

describe('Renderiza o componente Meals e,', () => {
  it('Verifica se os componentes foram renderizados', async () => {
    renderWithRouterAndContext(<Meals />);

    const cotba = await screen.findByRole('img', { name: /corba/i });
    expect(cotba).toBeInTheDocument();
    userEvent.click(cotba);
  });
});
