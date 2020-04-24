/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Alert from '../../Components/Alert';

import api from '../../services/api';

import './style.css';
import FormNote from '../../Components/FormNote';

export default function Notes() {
  const [notes, setNotes] = useState([]);

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

  function addAlert(type, message) {
    setAlertType(type);
    setAlertMessage(message);
  }

  function addNote(note, message) {
    if (note) {
      setNotes([...notes, {
        title: note.title,
        body: note.body,
        id: note.id,
        createdAt: note.createdAt,
      }]);
      addAlert('success', message);
    } else {
      addAlert('danger', message);
    }
  }

  async function handleClickDelete(noteId) {
    if (window.confirm('Deseja mesmo excluir esta nota?')) {
      const response = await api.delete(`/note/${noteId}`, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          userId: localStorage.getItem('userId'),
        },
      });

      if (response.status === 200) {
        addAlert('success', 'Nota excluída com sucesso');
        setNotes(notes.filter((n) => n.id !== noteId));
      } else {
        addAlert('warning', 'Não foi possível excluir a nota');
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
        <FormNote addNote={addNote} />
        <div className="row">
          {notes.map((note) => (
            <div className="col-md-4" key={note.id}>
              <div className="card note-card">
                <div className="card-header">
                  <div className="note-title">
                    {note.title}
                    <div className="float-right">
                      <button
                        className="btn-sm btn-primary btn"
                        type="button"
                      >
                        Alterar
                      </button>
                      &nbsp;
                      <button
                        className="btn-sm btn-danger btn"
                        type="button"
                        onClick={() => handleClickDelete(note.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {note.body}
                </div>
                <div className="card-footer text-muted text-right">
                  {
                  new Intl.DateTimeFormat('pt-BR')
                    .format(new Date(note.createdAt))
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
