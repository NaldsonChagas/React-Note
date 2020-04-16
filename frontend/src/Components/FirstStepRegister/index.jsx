import React from 'react';

export default function FirstStepRegister() {
  return (
    <form>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Nome"
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
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
