import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Notes from './Pages/Notes';
import ProtectedRouter from './Utils/ProtectedRouter';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Register} path="/register" />
        <ProtectedRouter component={Notes} path="/notes" />
        <ProtectedRouter component={Profile} path="/profile" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
