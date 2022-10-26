import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Drinks from './Pages/Drinks';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import AppProvider from './Context/AppProvider';
import Profile from './Pages/Profile';
import Done from './Pages/Done';
import Favorite from './Pages/Favorite';
import RecipeInProgress from './components/RecipeInProgress';
import NotFound from './Pages/NotFound';
import Recipe from './Pages/Recipe';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />

          <Route exact path="/meals" component={ Meals } />
          <Route
            path="/meals/:id-da-receita/in-progress"
            component={ RecipeInProgress }
          />
          <Route path="/meals/:id-da-receita" component={ Recipe } />

          <Route exact path="/drinks" component={ Drinks } />

          <Route
            path="/drinks/:id-da-receita/in-progress"
            component={ RecipeInProgress }
          />
          <Route path="/drinks/:id-da-receita" component={ Recipe } />

          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ Done } />

          <Route exact path="/favorite-recipes" component={ Favorite } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
