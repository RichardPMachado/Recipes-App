import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Favorite() {
  return (
    <div>
      <Header title="Favorite Recipes" />
      <h1 data-testid="page-title">Favorites</h1>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <Footer />
    </div>
  );
}
