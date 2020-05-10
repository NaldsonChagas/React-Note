import { Authorization, userId } from './authorizationData';
import api from './api';

const noteService = {
  async add(note) {
    return api.post('/note', {
      title: note.title,
      body: note.body,
    }, {
      headers: {
        Authorization,
        userId,
      },
    });
  },
  async update(note) {
    return api.put(`/note/${note.id}`, {
      id: note.id,
      title: note.title,
      body: note.body,
    }, {
      headers: {
        Authorization,
        userId,
      },
    });
  },
  async delete(noteId) {
    return api.delete(`/note/${noteId}`, {
      headers: {
        Authorization,
        userId,
      },
    });
  },
};

export default noteService;
