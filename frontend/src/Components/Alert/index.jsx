import React from 'react';

import { toast, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';

export default function Alert(props) {
  const { type, message } = props;

  toast[type](message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });

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
