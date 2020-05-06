import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({ title, children, id }) {
  return (
    <div className="modal" tabIndex="-1" role="dialog" id={id}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  title: 'React Notes',
  id: 'modal',
};

Modal.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
};
