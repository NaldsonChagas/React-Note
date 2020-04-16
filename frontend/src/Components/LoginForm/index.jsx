import React from 'react';

export default function LoginForm() {
  return (
    <form>
      <div className="form-group">
        <input
          className="form-control"
          name="user"
          id="user"
          placeholder="Nome de usuário ou email"
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="password"
          id="password"
          placeholder="Senha"
        />
      </div>
      <button
        type="submit"
        className="btn btn-sm btn-success"
      >
        Entrar
      </button>
    </form>
  );
}
