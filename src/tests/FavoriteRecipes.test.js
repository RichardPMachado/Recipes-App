import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renderWithRouter';
import App from '../App';

describe('Testando componente FavoriteRecipes', () => {
  test('Verfica se "Favorite" aparece na tela', () => {
    renderWithRouterAndContext(<App />, 'favorite-recipes');
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByPlaceholderText(/password/i);
    const btnSubmit = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(btnSubmit);
    const titlo = screen.getByRole('heading', { name: /favorites/i });
    expect(titlo).toBeInTheDocument();
  });
});
