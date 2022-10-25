import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Drinks from './components/Drinks';
import Login from './components/Login';
import Meals from './components/Meals';
import AppProvider from './Context/AppProvider';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
