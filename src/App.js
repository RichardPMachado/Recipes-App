import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Drinks from './Pages/Drinks';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import AppProvider from './Context/AppProvider';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import Favorite from './Pages/Favorite';
import RecipeInProgress from './components/RecipeInProgress';
import NotFound from './Pages/NotFound';
// import Recipe from './Pages/Recipe';
import RecipeDetails from './Pages/RecipeDetails';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />

          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />

          <Route
            exact
            path="/meals/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ RecipeInProgress }
          />

          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />

          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />

          <Route exact path="/favorite-recipes" component={ Favorite } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
