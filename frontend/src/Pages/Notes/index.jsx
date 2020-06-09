/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Alert from '../../Components/Alert';
import FormNote from '../../Components/FormNote';
import Modal from '../../Components/Modal';

import api from '../../services/api';

import './style.css';
import 'bootstrap/js/dist/modal';
import noteService from '../../services/noteService';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const [noteForUpdate, setNoteForUpdate] = useState('');

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

  function modalUpdateNote(note) {
    $('.modal').modal('show');
    setNoteForUpdate(note);
  }

  function orderNotes(notesForSort) {
    return notesForSort.sort((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      return 0;
    });
  }

  async function updateNote(noteForSave) {
    if (noteForSave) {
      try {
        const response = await noteService.update(noteForSave);
        const { message, note } = response.data;
        addAlert('success', message);
        setNotes(orderNotes([...notes
          .filter((n) => n.id !== noteForSave.id), note]));
        $('.modal').modal('hide');
      } catch (err) {
        addAlert('error',
          'Ocorreu um erro ao atualizar a nota');
      }
    }
  }

  async function addNote(noteForSave) {
    if (noteForSave) {
      const response = await noteService.add(noteForSave);
      const { message, note } = response.data;
      addAlert('success', message);
      setNotes(orderNotes([...notes, {
        title: note.title,
        body: note.body,
        id: note.id,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        userId: note.userId,
      }]));
    } else {
      addAlert('danger',
        'Ocorreu um erro ao salvar a nota');
    }
  }

  async function handleClickDelete(noteId) {
    if (window.confirm('Deseja mesmo excluir esta nota?')) {
      try {
        const response = await noteService.delete(noteId);
        addAlert('success', response.data.message);
        setNotes(notes.filter((n) => n.id !== noteId));
      } catch (e) {
        addAlert('error',
          'Não foi possível excluir a nota');
      }
    }
  }

  return (
    <>
      <Alert message={alertMessage} type={alertType} />
      <Header />
      <div className="container container-margin-top">
        <div className="col-md-8 new-note">
          <div className="card">
            <div className="card-header">
              Nova nota
            </div>
            <div className="card-body">
              <FormNote addNote={addNote} />
            </div>
          </div>
        </div>
        <div className="row">
          {notes.map((note) => (
            <div className="col-md-4" key={note.id}>
              <div className="card note-card">
                <div className="card-header">
                  <div className="note-title">
                    {note.title}
                  </div>
                </div>
                <div className="card-body">
                  {note.body}
                </div>
                <div className="card-footer">
                  <div>
                    <button
                      className="btn-sm btn-link btn"
                      type="button"
                      onClick={() => modalUpdateNote(note)}
                    >
                      Alterar
                    </button>

                    <button
                      className="btn-sm btn-link btn"
                      type="button"
                      onClick={() => handleClickDelete(note.id)}
                    >
                      Excluir
                    </button>
                  </div>
                  <div className="text-muted">
                    {new Intl.DateTimeFormat('pt-BR')
                      .format(new Date(note.createdAt))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      <Modal>
        <FormNote
          addNote={updateNote}
          note={noteForUpdate}
        />
      </Modal>
    </>
  );
}
