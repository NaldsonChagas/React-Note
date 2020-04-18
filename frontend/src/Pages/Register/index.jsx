/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import InitialHeader from '../../Components/InitialHeader';
import Footer from '../../Components/Footer';

import './style.css';

export default function Register(props) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setName(props.location.state.name);
    setEmail(props.location.state.email);
  }, []);

  return (
    <>
      <InitialHeader />
      <div className="container">
        <h3 className="text-center">
          Falta pouco...
          <span role="img" aria-label="winking-face">😉</span>
        </h3>
        <form className="col-md-5 col-sm-5 col-lg-5">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="name">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="surname">
                  Sobrenome
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  className="form-control"
                  required
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="username">
                  Nome de usuário
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirme sua senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="form-control"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-block btn-success"
          >
            Concluir cadastro
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
