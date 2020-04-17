import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function FirstStepRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

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
          className="form-control"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-sm btn-success"
      >
        Continuar
      </button>
    </form>
  );
}
