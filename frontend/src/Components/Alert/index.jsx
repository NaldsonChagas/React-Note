import React from 'react';

import { toast, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';

export default function Alert(props) {
  const { type, message } = props;

  const toastId = message.substr(0, 10);

  if (!toast.isActive(toastId)) {
    toast[type](message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      toastId,
    });
  }

  return (
    <ToastContainer />
  );
}

Alert.defaultProps = {
  message: 'Algo aconteceu errado',
  type: 'Warning',
};

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};
