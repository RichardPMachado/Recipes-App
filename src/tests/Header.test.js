import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import Header from '../components/Header';
import Meals from '../Pages/Meals';
import Drinks from '../Pages/Drinks';
import Done from '../Pages/Done';
import Profile from '../Pages/Profile';
import Favorite from '../Pages/Favorite';
import Recipe from '../Pages/Recipe';
// import NotFound from '../Pages/NotFound';
import RecipeInProgress from '../components/RecipeInProgress';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../App';

describe('verificar componente Header', () => {
  const page = 'page-title';
  const profile = 'profile-top-btn';
  const search = 'search-input';

  it('Verifica se os botões e o input estão na tela ao renderizar a pages Meals', () => {
    render(<Meals />);

    const pageTitle = screen.getByTestId(page);
    expect(pageTitle).toBeInTheDocument();

    const profileTopBtn = screen.getByTestId(profile);
    expect(profileTopBtn).toBeInTheDocument();

    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(search);
    expect(searchInput).toBeInTheDocument();
  });
  it('Verifica se os botões e o input estão na tela ao renderizar a pages Drinks', () => {
    render(<Drinks />);

    const pageTitle = screen.getByTestId(page);
    expect(pageTitle).toBeInTheDocument();

    const profileTopBtn = screen.getByTestId(profile);
    expect(profileTopBtn).toBeInTheDocument();

    const searchTopBtn = screen.getByTestId('search-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(search);
    expect(searchInput).toBeInTheDocument();
  });
  it('Verifica se os botões e o input estão na tela ao renderizar a pages Done', () => {
    render(<Done />);

    const pageTitle = screen.getByTestId(page);
    expect(pageTitle).toBeInTheDocument();

    const profileTopBtn = screen.getByTestId(profile);
    expect(profileTopBtn).toBeInTheDocument();
  });
  it('Verifica se os botões e o input estão na tela ao renderizar a pages Profile', () => {
    render(<Profile />);

    const pageTitle = screen.getByTestId(page);
    expect(pageTitle).toBeInTheDocument();

    const profileTopBtn = screen.getByTestId(profile);
    expect(profileTopBtn).toBeInTheDocument();
  });
  it('Verifica se os botões e o input estão na tela ao renderizar a pages Favorite', () => {
    render(<Favorite />);

    const pageTitle = screen.getByTestId(page);
    expect(pageTitle).toBeInTheDocument();

    const profileTopBtn = screen.getByTestId(profile);
    expect(profileTopBtn).toBeInTheDocument();
  });
  it('Verifica se os botões e o input estão na tela ao renderizar a pages Recipe', () => {
    render(<Recipe />);

    const pageTitle = screen.getByText('Recipe');
    expect(pageTitle).toBeInTheDocument();
  });
  it('Verifica se os botões e o input estão na tela ao renderizar a pages RecipeInProgress', () => {
    render(<RecipeInProgress />);

    const pageTitle = screen.getByText('Recipe In Progress');
    expect(pageTitle).toBeInTheDocument();
  });
  it('verificar botão Profile', async () => {
    renderWithRouterAndContext(<Meals />);

    const pageTitle = screen.getByTestId(page);
    const profileBtn = screen.getByTestId(profile);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();

    userEvent.click(profileBtn);
  });
});
