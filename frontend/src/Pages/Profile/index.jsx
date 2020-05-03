import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import api from '../../services/api';

export default function Profile() {
  const [profile, setProfile] = useState('');

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

  function handleClickUpdate() {}

  return (
    <>
      <Header />
      <div className="container container-margin-top">
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
                    Alterar minha senha
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button
              className="btn-link btn"
              onClick={() => handleClickUpdate}
              type="button"
            >
              Alterar meus dados
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
