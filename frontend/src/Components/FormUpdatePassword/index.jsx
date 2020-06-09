import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PasswordInputs from '../PasswordInputs';

export default function FormUpdatePassword({
  handleSubmitUpatePassword,
}) {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (newPassword && currentPassword && !hasPasswordError) {
      handleSubmitUpatePassword(
        {
          currentPassword,
          newPassword,
        },
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <PasswordInputs
        setPassword={setNewPassword}
        setHasPasswordError={setHasPasswordError}
        label="Digite uma nova senha"
        currentPassword={false}
        showConfirmPassword
      />

      <PasswordInputs
        setPassword={setCurrentPassword}
        setHasPasswordError={setHasPasswordError}
        label="Digite sua senha atual"
        currentPassword
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
  );
}

FormUpdatePassword.defaultProps = {
  handleSubmitUpatePassword: () => {
    throw new Error('A função de submit deve ser passada como prop');
  },
};

FormUpdatePassword.propTypes = {
  handleSubmitUpatePassword: PropTypes.func,
};
