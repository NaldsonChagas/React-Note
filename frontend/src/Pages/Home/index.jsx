import React, { useEffect, useState } from 'react';

import './style.css';

import LoginForm from '../../Components/LoginForm';
import FirstStepRegister from '../../Components/FirstStepRegister';
import Alert from '../../Components/Alert';
import Header from '../../Components/Header';


export default function Home(props) {
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    if (props.location.state) {
      const { alert } = props.location.state;
      if (alert) {
        setAlertMessage(alert.message);
        setAlertType(alert.type);
      }
    }
  }, []);

  return (
    <>
      {alertMessage ? <Alert type={alertType} message={alertMessage} /> : ''}
      <Header />
      <div className="greetings text-center">
        <h2>
          Olá
          <span role="img" aria-label="greeting">👋</span>
        </h2>
      </div>
      <div className="container identification-box">
        <div className="float-left col-md-6">
          <h3>
            Quero me cadastrar
            <span role="img" aria-label="grinning-face">😀</span>
          </h3>
          <FirstStepRegister />
        </div>
        <div className="col-md-6 float-right">
          <h3>
            Já tenho conta
            <span role="img" aria-label="smile-eyes">😁</span>
          </h3>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
