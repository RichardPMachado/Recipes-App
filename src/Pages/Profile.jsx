import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const storage = JSON.parse(localStorage.getItem('user'));
  const { email } = storage;
  const history = useHistory();

  const handleClickDone = () => {
    const path = '/done-recipes';
    history.push(path);
  };
  const handleClickFavorite = () => {
    const path = '/favorite-recipes';
    history.push(path);
  };

  const handleClickLogout = () => {
    localStorage.clear('user');
    const path = '/';
    history.push(path);
  };

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{ email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClickDone }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
