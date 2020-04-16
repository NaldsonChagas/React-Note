import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
