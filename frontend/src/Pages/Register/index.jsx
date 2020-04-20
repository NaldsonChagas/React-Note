/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import InitialHeader from '../../Components/InitialHeader';
import Footer from '../../Components/Footer';
import Alert from '../../Components/Alert';

import api from '../../services/api';

import './style.css';

export default function Register(props) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const [alert, setAlert] = useState('');

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [isPasswordEquivalents, setIsPasswordEquivalents] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setName(props.location.state.name);
    setEmail(props.location.state.email);
  }, []);

  async function checkExistingNameOrEmail() {
    if (username && email) {
      const responseUsername = await api
        .get(`/validator/username/${username}`);
      const responseEmail = await api
        .get(`/validator/email/${email}`);

      setHasUsernameError(responseUsername.data);
      setHasEmailError(responseEmail.data);
    }
  }

  function checkEquivalence() {
    setIsPasswordEquivalents(password === confirmPassword);
  }

  function hasError() {
    return hasEmailError
    || hasUsernameError
    || !isPasswordEquivalents;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (name && surname && email
      && username && password && !hasError()) {
      try {
        await api.post('/user', {
          name,
          surname,
          username,
          email,
          password,
        });
        history.push({
          pathname: '/',
          state: {
            alert: {
              message: 'Cadastro realizado com sucesso!',
              type: 'success',
            },
            email,
          },
        });
      } catch (error) {
        setAlert('Ocorreu um erro ao concluir a operação');
      }
    } else {
      setAlert('Confira seus dados e tente novamente');
    }
  }

  return (
    <>
      {alert ? <Alert type="error" message={alert} /> : ''}
      <InitialHeader />
      <div className="container">
        <h3 className="text-center">
          Falta pouco...
          <span role="img" aria-label="winking-face">😉</span>
        </h3>
        <form
          className="col-md-6 col-sm-6 col-lg-6"
          onSubmit={(e) => handleSubmit(e)}
        >
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
                  className={`form-control ${hasEmailError ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={checkExistingNameOrEmail}
                />
                {hasEmailError
                  ? (
                    <small id="usernameError" className="text-danger">
                      Email já cadastrado
                    </small>
                  )
                  : ''}
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
                  className={`form-control ${hasUsernameError ? 'is-invalid' : ''}`}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={checkExistingNameOrEmail}
                />
                {hasUsernameError
                  ? (
                    <small id="usernameError" className="text-danger">
                      Esse nome de usuário já existe
                    </small>
                  )
                  : ''}
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
              className={`form-control ${isPasswordEquivalents ? '' : 'is-invalid'}`}
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
              className={`form-control ${isPasswordEquivalents ? '' : 'is-invalid'}`}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={checkEquivalence}
            />
            {!isPasswordEquivalents
              ? (
                <small id="confirmPasswordError" className="text-danger">
                  As senhas não se equivalem
                </small>
              )
              : ''}
          </div>

          <button
            type="submit"
            className="btn btn-block btn-success"
            disabled={hasError()}
          >
            Concluir cadastro
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
