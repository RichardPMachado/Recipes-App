import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [receitaFeita, setReceitaFeita] = useState([]);
  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(localStorage, 'doneRecipes')) {
      const done = JSON.parse(localStorage.getItem('doneRecipes'));
      console.log(done);
      setReceitaFeita(done);
    }
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      {receitaFeita.map((element, index) => (
        <>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ element.image }
            alt={ element.name }
          />
          { element.type === 'meal'
            ? (
              <>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${element.nationality} - ${element.category}`}
                </p>
                {
                  element.tags.map((tag, indice) => (
                    <p
                      key={ indice }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </p>))
                }
              </>
            )
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${element.alcoholicOrNot}`}
              </p>) }
          <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{element.doneDate}</p>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="share" />
          </button>
        </>
      ))}
    </div>
  );
}
