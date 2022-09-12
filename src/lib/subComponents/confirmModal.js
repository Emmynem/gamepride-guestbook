import React from "react";
import { PrimaryMessage } from "./primaryMessage";
import { SuccessMessage } from "./successMessage";

export const ConfirmModal = ({ handleConfirm, loading, errorMessage, successMessage }) => {

    const openConfirmModal = function () {
        document.getElementById("confirmModal").style.display = "block";
    };

    const closeConfirmModal = function () {
        document.getElementById("confirmModal").style.display = "none";
    };

    const deleteRecord = () => {
        openConfirmModal();
        handleConfirm();
    };

    return (
        <div className="modal" id="confirmModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Action Confirmation</h4>
                        <button type="button" className="close" onClick={closeConfirmModal} data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        <p>Are you sure you want to continue ?</p>
                        <PrimaryMessage primaryMessage={errorMessage} />
                        <SuccessMessage successMessage={successMessage} />
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={deleteRecord} className="btn btn-success">
                            {
                                !loading ? '' : (
                                    <div className="spinner-border text-light spinner-border-sm"></div>
                                )
                            }
                            Continue
                        </button>
                        <button type="button" className="btn btn-danger" onClick={closeConfirmModal} data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
};