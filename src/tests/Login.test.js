import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helper/renderWithRouterAndContext';

escribe('Testa ações da pagina de detalhes', () => {
  it('verifica se a pagina da comida é renderizada corretamente', async () => {
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals/52977'] });
    const ingredient = await screen.findAllByTestId('0-ingredient-name-and-measure');
    expect(ingredient[0].innerHTML).toEqual('Lentils');
    expect(ingredient[1].innerHTML).toEqual('1 cup ');
    const favBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn);
    userEvent.click(favBtn);
    const startBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startBtn);
  });
  it('verifica se a página da bebida é renderizada corretamente', async () => {
    renderWithRouterAndContext(<App />, { initialEntries: ['/drinks/15997'] });
    const ingredient = await screen.findAllByTestId('0-ingredient-name-and-measure');
    expect(ingredient[0].innerHTML).toEqual('Galliano');
    expect(ingredient[1].innerHTML).toEqual('2 1/2 shots ');
    const favBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn);
    userEvent.click(favBtn);
    const startBtn = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startBtn);
  });
  it('testa localStorage', () => {
    const item = {
      drinks: {
        15997: [],
      },
      meals: {},
    };
    global.localStorage.setItem('inProgressRecipes', JSON.stringify(item));
    renderWithRouterAndContext(<App />, { initialEntries: ['/meals/52977'] });
  });
});
