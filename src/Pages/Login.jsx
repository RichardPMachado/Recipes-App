import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  // const { email, handleEmail, password } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const handleEmail = ({ target }) => setEmail(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);

  useEffect(() => {
    const minNumbersPassword = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length > minNumbersPassword;
    const btnState = verifyEmail && verifyPassword;
    setIsDisabled(!btnState);
  }, [email, password]);

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div>
      <input
        type="email"
        name=""
        value={ email }
        data-testid="email-input"
        placeholder="E-mail"
        onChange={ handleEmail }

      />
      <input
        type="password"
        name="password"
        value={ password }
        data-testid="password-input"
        placeholder="Password"
        onChange={ handlePassword }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}
