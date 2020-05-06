import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import InputMessageError from '../InputMessageError';

export default function PasswordInputs({
  setHasPasswordError,
  setPassword,
  formForUpdate,
}) {
  const [passwordTyped, setPasswordTyped] = useState('');
  const [confirmPasswordTyped,
    setConfirmPasswordTyped] = useState('');

  const [hasError, setHasError] = useState(false);
  const [isPasswordEquivalents,
    setIsPasswordEquivalents] = useState(true);
  const [isInsufficientSize,
    setIsinsufficientSize] = useState(false);

  useEffect(() => setPassword(passwordTyped), [passwordTyped]);
  useEffect(() => setHasPasswordError(hasError), [hasError]);

  useEffect(() => setHasError(!isPasswordEquivalents),
    [isPasswordEquivalents]);
  useEffect(() => setHasError(isInsufficientSize),
    [isInsufficientSize]);

  function checkEquivalence() {
    setIsPasswordEquivalents(passwordTyped === confirmPasswordTyped);
  }

  function validatorPassword() {
    if (passwordTyped && !formForUpdate) {
      if (!(passwordTyped.length >= 6)) {
        setIsinsufficientSize(true);
      } else {
        setIsinsufficientSize(false);
      }
    }
  }

  return (
    <>
      <div className="form-group">
        <label htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={`form-control ${isInsufficientSize
            ? 'is-invalid' : ''}`}
          required
          onChange={(e) => setPasswordTyped(e.target.value)}
          onBlur={validatorPassword}
        />
        <InputMessageError
          condition={isInsufficientSize}
          message="A senha deve ter 6 caracteres ou mais"
        />
      </div>
      {!formForUpdate ? (
        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirme sua senha
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={`form-control ${isPasswordEquivalents ? '' : 'is-invalid'}`}
            required
            onChange={(e) => setConfirmPasswordTyped(e.target.value)}
            onBlur={checkEquivalence}
          />
          <InputMessageError
            condition={!isPasswordEquivalents}
            message="As senhas não se equivalem"
          />
        </div>

      )
        : ''}
    </>
  );
}

PasswordInputs.defaultProps = {
  setHasPasswordError: () => {
    throw new Error('setHasPassword é necessário');
  },
  setPassword: () => {
    throw new Error('setPassword é necessário');
  },
  formForUpdate: false,
};

PasswordInputs.propTypes = {
  setHasPasswordError: PropTypes.func,
  setPassword: PropTypes.func,
  formForUpdate: PropTypes.bool,
};
