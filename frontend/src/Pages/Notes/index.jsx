import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Alert from '../../Components/Alert';

import api from '../../services/api';

import './style.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    api.get('/note', {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
        userId: localStorage.getItem('userId'),
      },
    }).then((response) => {
      setNotes(response.data.notes);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (title && body) {
      const response = await api.post('/note', {
        title, body,
      }, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          userId: localStorage.getItem('userId'),
        },
      });

      if (response.status === 200) {
        const { message, note } = response.data;
        setAlertType('success');
        setAlertMessage(message);
        setTitle('');
        setBody('');

        setNotes([...notes, {
          title: note.title,
          body: note.body,
          id: note.id,
          createdAt: note.createdAt,
        }]);
      } else {
        setAlertType('warning');
        setAlertMessage(response.data.message);
      }
    }
  }

  return (
    <>
      {alertMessage
        ? <Alert message={alertMessage} type={alertType} />
        : ''}
      <Header />
      <div className="container notes">
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

        <div className="row">
          {notes.map((note) => (
            <div className="col-md-4" key={note.id}>
              <div className="card note-card">
                <div className="card-header">
                  {note.title}
                </div>
                <div className="card-body">
                  {note.body}
                </div>
                <div className="card-footer text-muted text-right">
                  {
                  new Intl.DateTimeFormat('pt-BR').format(new Date(note.createdAt))
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
