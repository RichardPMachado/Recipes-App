import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import Footer from '../components/Footer';

test('Renderiza os botões na tela', () => {
  renderWithRouter(<Footer />);

  const botao = screen.getAllByRole('button');
  expect(botao[0]).toBeInTheDocument();
});

test('Renderiza ícone na tela', () => {
  renderWithRouter(<Footer />);

  const icon = screen.getAllByRole('img');
  expect(icon[0]).toBeInTheDocument();
});

test('Procura por data-testid', () => {
  renderWithRouter(<Footer />);

  const iconDrink = screen.getByTestId('drinks-bottom-btn');
  expect(iconDrink).toBeInTheDocument();
});

test('Testa o clique no botão redireciona para /drinks', () => {
  const { history } = renderWithRouter(<Footer />);

  const iconDrinks = screen.getByTestId('drinks-bottom-btn');
  userEvent.click(iconDrinks);
  expect(history.location.pathname).toBe('/drinks');
});

test('Testa o clique no botão redireciona para /meals', () => {
  const { history } = renderWithRouter(<Footer />);

  const iconMeals = screen.getByTestId('meals-bottom-btn');
  userEvent.click(iconMeals);
  expect(history.location.pathname).toBe('/meals');
});
