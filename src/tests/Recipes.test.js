import { screen } from '@testing-library/react';
import Meals from '../Pages/Meals';
// import renderWithRouter from './helper/renderWithRouter';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import meals from '../../cypress/mocks/meals';
// import App from '../App';
// import Recipes from '../components/Recipes';

describe('Testando componentes de Recipes.js', () => {
  test('verifica se botões de filtros aparecem na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
    renderWithRouterAndContext(<Meals />);
    const btnBeef = screen.getByRole('button', { name: /beef/i });
    expect(btnBeef).toBeInTheDocument();
  });
});
