import React from 'react';
import PropTypes from 'prop-types';

const DeleteConfirmationModal = ({ show, onCancel, onConfirm }) => {
    return (
        <div className={`modal${show ? ' d-block' : ''}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmation</h5>
                        <button type="button" className="btn-close" onClick={onCancel} />
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this person?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DeleteConfirmationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
