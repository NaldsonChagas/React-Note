const Sequelize = require('sequelize');
const connection = require('../config');

const User = connection.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 70],
    }
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100],
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 20],
      not: /[ `´!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100],
    }
  }
}, {});

User.sync({ force: false });

module.exports = User;