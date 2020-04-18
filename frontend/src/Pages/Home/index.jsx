import React, { useEffect, useState } from 'react';

import './style.css';

import LoginForm from '../../Components/LoginForm';
import FirstStepRegister from '../../Components/FirstStepRegister';
import InitialHeader from '../../Components/InitialHeader';
import Alert from '../../Components/Alert';


export default function Home(props) {
  const [alertWarning, setAlertWarning] = useState('');

  useEffect(() => {
    if (props.location.state) {
      const { message } = props.location.state;
      if (message) {
        setAlertWarning(message);
      }
    }
  }, []);

  return (
    <>
      {alertWarning ? <Alert type="warning" message={alertWarning} /> : ''}
      <InitialHeader />
      <div className="greetings text-center">
        <h2>
          Olá
          <span role="img" aria-label="greeting">👋</span>
        </h2>
      </div>
      <div className="container identification-box">
        <div className="col-md-6 float-right">
          <h3>
            Já tenho conta
            <span role="img" aria-label="smile-eyes">😁</span>
          </h3>
          <LoginForm />
        </div>
        <div className="float-left col-md-6">
          <h3>
            Quero me cadastrar
            <span role="img" aria-label="grinning-face">😀</span>
          </h3>
          <FirstStepRegister />
        </div>
      </div>
    </>
  );
}
