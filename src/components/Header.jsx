import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, children }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  console.log(children);
  const hendleClickProfile = () => {
    const path = 'profile';
    history.push(path);
  };

  const handleDisabledInput = () => setIsDisabled((prev) => !prev);

  return (
    <header>
      <h2 data-testid="page-title">{ title }</h2>
      <button type="button" onClick={ hendleClickProfile }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      </button>
      {(title === 'Meals' || title === 'Drinks')
      && (
        <>
          <button
            type="button"
            onClick={ handleDisabledInput }
            data-testid="search-top-btn"
            src={ searchIcon }
          >
            <img src={ searchIcon } alt="search" />
          </button>
          {isDisabled && (
            <SearchBar />
          )}
        </>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
