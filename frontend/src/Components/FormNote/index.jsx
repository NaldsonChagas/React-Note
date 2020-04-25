import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

export default function FormNote({ note, addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    }
  }, [note]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (title && body) {
      try {
        let noteForSave;

        if (note) {
          noteForSave = { id: note.id, title, body };
        } else {
          noteForSave = { title, body };
          setTitle('');
          setBody('');
        }

        addNote(noteForSave);
      } catch (err) {
        addNote(null);
      }
    }
  }

  return (
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
        Salvar
      </button>
    </form>
  );
}

FormNote.PropType = {
  addNote: PropTypes.func,
};
