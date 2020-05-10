import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PasswordInputs from '../PasswordInputs';

export default function LoginForm({ handleLogin }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (user && password) {
      handleLogin({
        user,
        password,
      });
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            name="user"
            id="user"
            placeholder="Nome de usuário ou email"
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <PasswordInputs
          setPassword={setPassword}
          placeholder="Senha"
          currentPassword
          showConfirmPassword={false}
        />
        <button
          type="submit"
          className="btn btn-sm btn-success"
        >
          Entrar
        </button>
      </form>
    </>
  );
}

LoginForm.defaultValues = {
  handleSubmit: () => {
    throw Error('Função de login não foi passada');
  },
};

LoginForm.proptype = {
  handleSubmit: PropTypes.func,
};
