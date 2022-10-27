import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderWithRouterAndContext from './helper/renderWithRouterAndContext';
import Profile from '../Pages/Profile';

describe('Verifica funcionamento do Componente Profile', () => {
  test('Clique no botão favorite recipes', async () => {
    renderWithRouterAndContext(<Profile />);

    const profile = screen.getByRole('heading', { name: /profile/i });
    expect(profile).toBeInTheDocument();

    const footerMeals = screen.getByRole('img', { name: /meals/i });
    expect(footerMeals).toBeInTheDocument();

    const footerDrinks = screen.getByRole('img', { name: /drink/i });
    expect(footerDrinks).toBeInTheDocument();

    const favorite = await screen.findByRole('button', { name: /favorite recipes/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
  });

  test('Clique no botão done recipes', async () => {
    renderWithRouterAndContext(<Profile />);

    const done = await screen.findByRole('button', { name: /done recipes/i });
    expect(done).toBeInTheDocument();
    userEvent.click(done);
  });

  test('Clique no botão Logout', async () => {
    renderWithRouterAndContext(<Profile />);

    const logout = await screen.findByRole('button', { name: /logout/i });
    expect(logout).toBeInTheDocument();
    userEvent.click(logout);
  });

  test('Clique no botão email', async () => {
    global.localStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));

    renderWithRouterAndContext(<Profile />);
    const email = screen.getByText('test@test.com');
    expect(email).toBeInTheDocument();
    userEvent.click(email);
  });
});
