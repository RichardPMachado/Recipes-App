import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../Pages/DoneRecipes';
import renderWithRouterAndContext from './helper/renderWithRouterAndContext';

test('Testa se na tela renderiza o texto Done Recipes', () => {
  renderWithRouterAndContext(<DoneRecipes />);

  const title = screen.getByTestId('page-title');
  expect(title).toBeInTheDocument();
});
test('Testa se na tela renderiza os botões na tela', () => {
  window.document.execCommand = jest.fn(() => true);
  // global.localStorage.setItem('doneRecipes', );
  renderWithRouterAndContext(<DoneRecipes />);

  const btnProfile = screen.getByRole('button', { name: /profile/i });
  expect(btnProfile).toBeInTheDocument();
  userEvent.click(btnProfile);

  const btnFiltroAll = screen.getByRole('button', { name: /all/i });
  expect(btnFiltroAll).toBeInTheDocument();
  userEvent.click(btnFiltroAll);

  const btnFiltroMeal = screen.getByRole('button', { name: /meals/i });
  expect(btnFiltroMeal).toBeInTheDocument();
  userEvent.click(btnFiltroMeal);

  const btnFiltroDrink = screen.getByRole('button', { name: /meals/i });
  expect(btnFiltroDrink).toBeInTheDocument();
  userEvent.click(btnFiltroDrink);
});
