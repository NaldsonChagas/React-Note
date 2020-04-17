import React from 'react';

import PropTypes from 'prop-types';

export default function Alert(props) {
  const { type, message } = props;

  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
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
