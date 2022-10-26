import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import AppProvider from '../Context/AppProvider';

describe('Renderiza o componente SearchBar e,', () => {
  it('Testa se os componentes foram renderizados', () => {
    const history = createMemoryHistory();
    render(
      <AppProvider>
        <Router history={ history }>
          <SearchBar />
        </Router>
      </AppProvider>,
    );
    global.alert = jest.fn();
    const searchImput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');

    expect(searchImput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    act(() => {
      userEvent.type(searchImput, 'teste');
      userEvent.click(ingredientRadio);
      userEvent.click(searchButton);
      userEvent.click(nameRadio);
      userEvent.click(searchButton);
      userEvent.click(firstLetterRadio);
      userEvent.click(searchButton);
    });

    expect(global.alert).toHaveBeenCalled();
  });
});
