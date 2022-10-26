import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

const getElement = ((scr) => {
  const searchImput = scr.getByTestId('search-input');
  const ingredientRadio = scr.getByTestId('ingredient-search-radio');
  const nameRadio = scr.getByTestId('name-search-radio');
  const firstLetterRadio = scr.getByTestId('first-letter-search-radio');
  const searchButton = scr.getByTestId('exec-search-btn');

  return {
    searchImput,
    ingredientRadio,
    nameRadio,
    firstLetterRadio,
    searchButton,
  };
});

describe('Renderiza o componente SearchBar e,', () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  it('Verifica se os componentes foram renderizados', () => {
    renderWithRouterAndContext(<SearchBar />, '/meals');
    const {
      searchImput,
      ingredientRadio,
      nameRadio,
      firstLetterRadio,
      searchButton,
    } = getElement(screen);

    expect(searchImput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.click(ingredientRadio);
  });

  it('Verifica se ao fazer uma busca sem resultado um alert é desparado', async () => {
    renderWithRouterAndContext(<SearchBar />, '/meals');

    const {
      searchImput,
      nameRadio,
      searchButton,
    } = getElement(screen);

    act(() => {
      userEvent.type(searchImput, 'kkkkkk');
      userEvent.click(nameRadio);
      userEvent.click(searchButton);
    });

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });

  it('Verifica se dispara um alerta quando selecionado firstLetterRadio e a busca tem mais de 1 caractere', async () => {
    renderWithRouterAndContext(<SearchBar />, '/meals');

    const {
      searchImput,
      firstLetterRadio,
      searchButton,
    } = getElement(screen);

    act(() => {
      userEvent.type(searchImput, 'kkkkkk');
      userEvent.click(firstLetterRadio);
      userEvent.click(searchButton);
    });

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });

  it('Verifica se a API retornar apenas 1 resultado a pagina meals é redirecionada', async () => {
    const { history } = renderWithRouterAndContext(<SearchBar />, '/meals');
    history.push = jest.fn();

    const {
      searchImput,
      nameRadio,
      searchButton,
    } = getElement(screen);

    act(() => {
      userEvent.type(searchImput, 'Arrabiata');
      userEvent.click(nameRadio);
      userEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledWith('/meals/52771');
      expect(history.push).toHaveBeenCalledTimes(1);
    });
  });

  it('Verifica se a API retornar apenas 1 resultado a pagina drinks é redirecionada', async () => {
    const { history } = renderWithRouterAndContext(<SearchBar />, '/drinks');
    history.push = jest.fn();

    const {
      searchImput,
      nameRadio,
      searchButton,
    } = getElement(screen);

    act(() => {
      userEvent.type(searchImput, 'Aquamarine');
      userEvent.click(nameRadio);
      userEvent.click(searchButton);
    });

    await waitFor(() => expect(history.push).toHaveBeenCalledWith('/drinks/178319'));
  });
});
