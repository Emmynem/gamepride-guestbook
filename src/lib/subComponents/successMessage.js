import React from "react";

export const SuccessMessage = ({ successMessage }) => {
    return (
        <div className="alert alert-success">
            <strong>Success!</strong> {!successMessage ? '' : successMessage}
        </div>
    )
};