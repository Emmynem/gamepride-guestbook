import React from "react";
import { PrimaryMessage } from "./primaryMessage";
import { SuccessMessage } from "./successMessage";

export const DeleteModal = ({ handleDelete, loading, errorMessage, successMessage }) => {

    const openDeleteModal = function () {
        document.getElementById("deleteModal").style.display = "block";
    };

    const closeDeleteModal = function () {
        document.getElementById("deleteModal").style.display = "none";
    };

    const confirmRecord = () => {
        openDeleteModal();
        handleDelete();
    };

    return (
        <div className="modal" id="deleteModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Delete Confirmation</h4>
                        <button type="button" className="close" onClick={closeDeleteModal} data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        <p>Are you sure you want to delete this item ?</p>
                        <PrimaryMessage primaryMessage={errorMessage} />
                        <SuccessMessage successMessage={successMessage} />
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={confirmRecord} className="btn btn-success">
                            {
                                !loading ? '' : (
                                    <div className="spinner-border text-light spinner-border-sm"></div>
                                )
                            }
                            Yes
                        </button>
                        <button type="button" className="btn btn-danger" onClick={closeDeleteModal} data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
};