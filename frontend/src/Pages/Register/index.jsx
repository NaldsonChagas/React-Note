import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Alert from '../../Components/Alert';
import FormUser from '../../Components/FormUser';


export default function Register({ location }) {
  const history = useHistory();

  const [alert, setAlert] = useState('');

  const [user, setUser] = useState('');

  useEffect(() => {
    setUser({
      name: location.state.name,
      email: location.state.email,
    });
  }, [location]);

  async function handleSubmit(userToSave) {
    const {
      name,
      surname,
      username,
      email,
      password,
    } = userToSave;

    try {
      await api.post('/user', {
        name,
        surname,
        username,
        email,
        password,
      });
      history.push({
        pathname: '/',
        state: {
          alert: {
            message: 'Cadastro realizado com sucesso!',
            type: 'success',
          },
          email,
        },
      });
    } catch (error) {
      setAlert('Ocorreu um erro ao concluir a operação');
    }
  }


  return (
    <>
      <Alert type="error" message={alert} />
      <Header />
      <div className="container container-margin-top">
        <h3 className="text-center">
          Falta pouco...
          <span role="img" aria-label="winking-face">😉</span>
        </h3>
        <div className="col-md-6 offset-md-3">
          <FormUser
            saveUser={handleSubmit}
            user={user}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
