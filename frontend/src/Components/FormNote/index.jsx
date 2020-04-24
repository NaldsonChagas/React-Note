import React, { useState } from 'react';

import PropTypes from 'prop-types';

import './style.css';

export default function FormNote(props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (title && body) {
      try {
        props.addNote({ title, body });
        setTitle('');
        setBody('');
      } catch (err) {
        props.addNote(null);
      }
    }
  }

  return (
    <div className="col-md-8 new-note">
      <div className="card">
        <div className="card-header">
          Nova nota
        </div>
        <div className="card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Conteúdo</label>
              <textarea
                className="form-control"
                name="body"
                id="body"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-primary"
            >
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

FormNote.PropType = {
  addNote: PropTypes.func,
};
