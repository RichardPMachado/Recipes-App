import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import drinkCategories from '../../cypress/mocks/drinkCategories';

test('verifica se botões de filtros drincks aparecem na tela', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(drinkCategories),
  }));
  renderWithRouter(<App />);
  const emailInput = screen.getByRole('textbox');
  const passInput = screen.getByPlaceholderText(/password/i);
  const btnSubmit = screen.getByRole('button', { name: /enter/i });
  userEvent.type(emailInput, 'teste@gmail.com');
  userEvent.type(passInput, '1234567');
  userEvent.click(btnSubmit);
  const drinckLinck = screen.getByRole('img', { name: /drink/i });
  userEvent.click(drinckLinck);
  const btnOrdinaryDrink = await screen.findByRole('button', { name: /ordinary drink/i });
  expect(btnOrdinaryDrink).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(4);
  userEvent.click(btnOrdinaryDrink);
});
