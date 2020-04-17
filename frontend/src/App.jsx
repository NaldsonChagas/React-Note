import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Notes from './Pages/Notes';
import ProtectedRouter from './Utils/ProtectedRouter';
import Register from './Pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={Register} path="/register" />
        <ProtectedRouter component={Notes} path="/notes" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
