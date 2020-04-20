import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function FirstStepRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [hasEmailError, setHasEmailError] = useState(false);

  const history = useHistory();

  async function checkExistingEmail() {
    const responseEmail = await api
      .get(`/validator/email/${email}`);

    setHasEmailError(responseEmail.data);
  }

  function handleSubmit(event) {
    event.preventDefault();

    history.push({
      pathname: '/register',
      state: { name, email },
    });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          className={`form-control ${hasEmailError ? 'is-invalid' : ''}`}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={checkExistingEmail}
          required
        />
        {hasEmailError
          ? (
            <small id="emailError" className="text-danger">
              Email já cadastrado
            </small>
          ) : ''}
      </div>

      <button
        type="submit"
        className="btn btn-sm btn-success"
        disabled={hasEmailError}
      >
        Continuar
      </button>
    </form>
  );
}
