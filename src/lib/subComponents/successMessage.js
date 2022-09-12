import React from "react";

export const SuccessMessage = ({ successMessage }) => {
    return (
        <>
            {
                !successMessage ? '' :
                (
                    <div className="alert alert-success mt-2 mb-2">
                        <strong>Success!</strong> {successMessage}
                    </div>
                )
            }
        </>
    )
};