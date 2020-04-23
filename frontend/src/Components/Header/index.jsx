import React, { useState, useEffect } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './style.css';

export default function Header() {
  const [loggedUser, setLoggedUser] = useState('');

  useEffect(() => {
    const jwtToken = localStorage.getItem('Authorization');
    const userId = localStorage.getItem('userId');

    if (jwtToken && userId) {
      api.get('/profile', {
        headers: {
          Authorization: jwtToken,
          userId,
        },
      }).then((response) => {
        setLoggedUser(response.data.user);
      });
    }
  }, []);

  function logout() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('userId');
  }

  return (
    <>
      {loggedUser
        ? (
          <div className="logged-user">
            <div className="container text-right">
              <Link to="/profile">
                Minha conta
              </Link>
              &nbsp;
              <BsFillPersonFill />
              {' '}
              |
              {' '}
              <Link to="/" onClick={logout}>Sair</Link>
            </div>
          </div>
        )
        : ''}
      <header className="col-md-12">
        <div className="container">
          <Link to="/">
            <img src="img/logo-dark.png" alt="Logo do React Note" />
          </Link>
        </div>
      </header>
    </>
  );
}
