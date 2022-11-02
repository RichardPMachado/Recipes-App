import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Footer from './Footer';
import Header from './Header';
import '../App.css';

export default function Favorite() {
  const [favorites, setFavorites] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));
  const [filter, setFilter] = useState('all');
  const [alert, setAlert] = useState(false);

  const handleShare = (type, id) => {
    // global.alert('Link copied!'); // OBS: O teste não consegue capturar a mensagem do alerta por conta da resolução.
    setAlert(true);
    const copyLinkRecipe = `http://localhost:3000/${type}s/${id}`;

    // Copy the text inside the text field *https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    navigator.clipboard.writeText(copyLinkRecipe);
  };

  const desfavorite = (id) => {
    console.log(id);
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = getFavorites.filter((recipes) => recipes.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const filterRecipes = ({ target }) => {
    console.log(target.name);
    setFilter(target.name);
  };

  return (
    <div>
      { alert && (
        <div>
          <h1>Link copied!</h1>
          <button type="button" onClick={ () => setAlert(false) }>OK</button>
        </div>
      ) }
      <Header title="Favorite Recipes" />
      <h1 data-testid="page-title">Favorites</h1>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="all"
        onClick={ filterRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="meal"
        onClick={ filterRecipes }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ filterRecipes }
      >
        Drinks
      </button>
      { favorites.filter((elem) => {
        switch (filter) {
        case 'all':
          return elem;
        case 'meal':
          return elem.type === 'meal';
        case 'drink':
          return elem.type === 'drink';
        default:
          return elem;
        }
      }).map((recipes, index) => (
        <div
          id={ recipes.id }
          key={ index }
        >
          <Link
            to={ { pathname: `/${recipes.type}s/${recipes.id}` } }
          >
            <div data-testid={ `${index}-card-name` }>
              {recipes.strrecipes}
            </div>
            <img
              src={ recipes.image }
              alt={ recipes.name }
              data-testid={ `${index}-horizontal-image` }
              width="300"
            />
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipes.name }</h3>
          </Link>
          <div className="favoriteRecipes">
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { ` ${recipes.alcoholicOrNot}${recipes.nationality} - ${recipes.category}` }
            </p>
            <input
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="compartilhar"
              onClick={ () => handleShare(recipes.type, recipes.id) }
            />
            <input
              type="image"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="Desfavoritar"
              onClick={ () => desfavorite(recipes.id) }
            />
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
}
