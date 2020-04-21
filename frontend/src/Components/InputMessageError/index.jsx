import React from 'react';

import PropTypes from 'prop-types';

export default function InputMessageError(props) {
  const { condition, message } = props;
  return (
    <>
      {condition ? (
        <small className="text-danger">
          {message}
        </small>
      ) : ''}
    </>
  );
}

InputMessageError.defaultProps = {
  condition: false,
  message: '',
};

InputMessageError.propTypes = {
  condition: PropTypes.bool,
  message: PropTypes.string,
};
