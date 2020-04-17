import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
import Notes from './Pages/Notes';
import ProtectedRouter from './Utils/ProtectedRouter';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <ProtectedRouter component={Notes} path="/notes" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
