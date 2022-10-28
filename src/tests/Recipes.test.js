import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Testando componentes de Recipes.js', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    }));
  });
  afterEach(() => jest.clearAllMocks());
  test('verifica se botões de filtros meal aparecem na tela', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByPlaceholderText(/password/i);
    const btnSubmit = screen.getByRole('button', { name: /enter/i });
    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passInput, '1234567');
    userEvent.click(btnSubmit);
    const btnBeef = await screen.findByRole('button', { name: /beef/i });
    expect(btnBeef).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    userEvent.click(btnBeef);
  });
});
