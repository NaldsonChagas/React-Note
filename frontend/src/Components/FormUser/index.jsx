import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import InputMessageError from '../InputMessageError';

import './style.css';

export default function FormUser({ saveUser, user }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [isPasswordEquivalents, setIsPasswordEquivalents] = useState(true);

  useEffect(() => {
    setName(user.name ? user.name : '');
    setSurname(user.surname ? user.surname : '');
    setEmail(user.email ? user.email : '');
    setUsername(user.username ? user.username : '');
  }, [user]);

  function hasError() {
    return hasEmailError
    || hasUsernameError
    || !isPasswordEquivalents;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name && surname && email
      && username && password && !hasError()) {
      saveUser(
        {
          name,
          surname,
          email,
          username,
          password,
        },
      );
    }
  }

  async function checkExistingNameOrEmail() {
    if (username && email) {
      const responseUsername = await api
        .get(`/validator/username/${username}`);
      const responseEmail = await api
        .get(`/validator/email/${email}`);

      setHasUsernameError(!!responseUsername.data);
      setHasEmailError(!!responseEmail.data);
    }
  }

  function checkEquivalence() {
    setIsPasswordEquivalents(password === confirmPassword);
  }

  function validatorPassword() {
    if (password) {
      if (!(password.length >= 6)) {
        setHasPasswordError(true);
      } else {
        setHasPasswordError(false);
      }
    }
  }

  return (
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
            <InputMessageError
              condition={hasEmailError}
              message="Email já cadastrado"
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
              className={`form-control ${hasUsernameError ? 'is-invalid' : ''}`}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={checkExistingNameOrEmail}
            />
            <InputMessageError
              condition={hasUsernameError}
              message="Esse nome de usuário já existe"
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
          className={`form-control ${hasPasswordError
            ? 'is-invalid' : ''}`}
          required
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatorPassword}
        />
        <InputMessageError
          condition={hasPasswordError}
          message="A senha deve ter 6 caracteres ou mais"
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
        <InputMessageError
          condition={!isPasswordEquivalents}
          message="As senhas não se equivalem"
        />
      </div>

      <button
        type="submit"
        className="btn btn-block btn-success"
        disabled={hasError()}
      >
        Concluir cadastro
      </button>
    </form>
  );
}
