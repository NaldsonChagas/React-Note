import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Notes from './Pages/Notes';
import Profile from './Pages/Profile';
import ProtectedRouter from './Utils/ProtectedRouter';

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Register} path="/register" />
      <ProtectedRouter component={Notes} path="/notes" />
      <ProtectedRouter component={Profile} path="/profile" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
