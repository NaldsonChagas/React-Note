import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import api from '../../services/api';

import InputMessageError from '../InputMessageError';
import PasswordInputs from '../PasswordInputs';

export default function FormUser({ saveUser, user, formForUpdate }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);

  useEffect(() => {
    setName(user.name ? user.name : '');
    setSurname(user.surname ? user.surname : '');
    setEmail(user.email ? user.email : '');
    setUsername(user.username ? user.username : '');
  }, [user]);

  function hasError() {
    return hasEmailError
    || hasUsernameError
    || hasPasswordError;
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
    if (username && email && !formForUpdate) {
      const responseUsername = await api
        .get(`/validator/username/${username}`);
      const responseEmail = await api
        .get(`/validator/email/${email}`);

      setHasUsernameError(!!responseUsername.data);
      setHasEmailError(!!responseEmail.data);
    }
  }

  return (
    <form
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
              value={surname}
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

      <PasswordInputs
        setPassword={setPassword}
        setHasPasswordError={setHasPasswordError}
        formForUpdate={formForUpdate}
      />

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

FormUser.defaultProps = {
  formForUpdate: false,
  saveUser: () => new Error(
    'Uma função para submit é necessária nas props',
  ),
};

FormUser.propTypes = {
  formForUpdate: PropTypes.bool,
  saveUser: PropTypes.func,
};
