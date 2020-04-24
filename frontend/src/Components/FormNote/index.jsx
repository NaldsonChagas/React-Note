import React, { useState } from 'react';

import api from '../../services/api';

import './style.css';

export default function FormNote(props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (title && body) {
      try {
        const response = await api.post('/note', {
          title, body,
        }, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            userId: localStorage.getItem('userId'),
          },
        });
        const { message, note } = response.data;
        props.addNote(note, message);

        setTitle('');
        setBody('');
      } catch (err) {
        props.addNote(null,
          'Ocorreu um erro ao adicionar a nota');
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
