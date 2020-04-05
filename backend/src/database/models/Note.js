const connection = require('../config');
const Sequelize = require('sequelize');

const User = require('./User');

const Note = connection.define('note', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 300]
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

Note.sync({ force: false });

module.exports = Note;