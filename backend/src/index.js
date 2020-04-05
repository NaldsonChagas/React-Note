require('dotenv').config();

const express = require('express');
const app = express();

const connection = require('./database/config');

connection.authenticate()
  .then(result => console.log('Connection with db ok'))
  .catch(err => console.log(err));

const User = require('./database/models/User');
const Note = require('./database/models/Note');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});