import { Authorization, userId } from './authorizationData';
import api from './api';

const profileService = {
  async get() {
    return api.get('/profile', {
      headers: {
        Authorization,
        userId,
      },
    });
  },
  async update(user) {
    return api.put('/user', user, {
      headers: {
        Authorization,
        userId,
      },
    });
  },
  async updatePassword(currentPassword, newPassword) {
    return api.put('/user/password', {
      newPassword,
      password: currentPassword,
    }, {
      headers: {
        Authorization,
        userId,
      },
    });
  },
};

export default profileService;
