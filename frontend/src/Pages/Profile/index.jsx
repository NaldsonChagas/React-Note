import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Modal from '../../Components/Modal';
import FormUser from '../../Components/FormUser';
import api from '../../services/api';
import Alert from '../../Components/Alert';

import './style.css';
import PasswordInputs from '../../Components/PasswordInputs';

export default function Profile() {
  const modalUpdateId = 'modalUpdate';
  const modalUpdatePasswordId = 'modalUpadePassword';

  const [profile, setProfile] = useState({});

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);


  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: localStorage
          .getItem('Authorization'),
        userId: localStorage
          .getItem('userId'),
      },
    }).then((response) => {
      setProfile(response.data.user);
    });
  }, []);

  function openModalUpdate() {
    $(`#${modalUpdateId}`).modal('show');
  }

  function openModalPassword() {
    $(`#${modalUpdatePasswordId}`).modal('show');
  }

  function addAlert(type, message) {
    setAlertType(type);
    setAlertMessage(message);
  }

  async function handleSubmitUpateUser({
    name, surname, email, username, password,
  }) {
    try {
      const response = await api.put('/user', {
        name,
        surname,
        email,
        username,
        password,
      }, {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
          userId: localStorage.getItem('userId'),
        },
      });
      $(`#${modalUpdateId}`).modal('hide');
      setProfile({
        name, surname, email, username,
      });
      addAlert('success', response.data.message);
    } catch (err) {
      addAlert('error',
        'Ocorreu um erro ao atualizar suas informações');
    }
  }

  async function handleSubmitUpatePassword(event) {
    event.preventDefault();
    if (!hasPasswordError) {
      try {
        const response = await api.put('/user/password', {
          newPassword,
          password: currentPassword,
        }, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
            userId: localStorage.getItem('userId'),
          },
        });
        addAlert('success', response.data.message);
        $(`#${modalUpdatePasswordId}`).modal('hide');
      } catch (err) {
        addAlert('success',
          'Não foi possível alterar sua senha');
      }
    }
  }

  return (
    <>
      <Alert message={alertMessage} type={alertType} />
      <Header />
      <div className="container container-margin-top">
        <Link to="/notes">Voltar</Link>
        <div className="card">
          <div className="card-header">
            <h4>Meus dados</h4>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>Nome completo</th>
                  <td>
                    {profile.name}
                    {' '}
                    {profile.surname}
                  </td>
                </tr>
                <tr>
                  <th>Nome de usuário</th>
                  <td>{profile.username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{profile.email}</td>
                </tr>
                <tr>
                  <th>Senha</th>
                  <td>
                    <button
                      className="btn-link btn"
                      onClick={openModalPassword}
                      type="button"
                    >
                      Alterar minha senha
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button
              className="btn-link btn"
              onClick={openModalUpdate}
              type="button"
            >
              Alterar meus dados
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Modal title="Atualize seus dados" id={modalUpdateId}>
        <FormUser
          user={profile}
          saveUser={handleSubmitUpateUser}
          formForUpdate
          showConfirmPassword={false}
        />
      </Modal>
      <Modal title="Atualize sua senha" id={modalUpdatePasswordId}>
        <form onSubmit={handleSubmitUpatePassword}>

          <PasswordInputs
            setPassword={setNewPassword}
            setHasPasswordError={setHasPasswordError}
            label="Digite sua nova senha"
            currentPassword={false}
            showConfirmPassword={false}
          />

          <PasswordInputs
            setPassword={setCurrentPassword}
            setHasPasswordError={setHasPasswordError}
            label="Digite sua senha atual"
            currentPassword
            showConfirmPassword={false}
          />

          <button
            type="submit"
            className="btn btn-block btn-success"
            onSubmit={handleSubmitUpatePassword}
            disabled={hasPasswordError}
          >
            Confirmar
          </button>
        </form>
      </Modal>
    </>
  );
}
