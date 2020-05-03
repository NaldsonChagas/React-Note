import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Alert from '../Alert';

export default function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState('');

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    api.post('/', { user, password }).then((response) => {
      const { token, userId } = response.data;
      localStorage.setItem('Authorization', `Bearer ${token}`);
      localStorage.setItem('userId', userId);
      history.push('/notes');
    }, (err) => {
      setAlert(err.response.data.message);
    });
  }

  return (
    <>
      <Alert type="warning" message={alert} />
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
        <div className="form-group">
          <input
            className="form-control"
            name="password"
            type="password"
            id="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
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
