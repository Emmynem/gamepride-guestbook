import React from "react";

export const SuccessMessage = ({ successMessage }) => {
    return (
        <p className='text-success' placeholder="success_message">{!successMessage ? '' : successMessage}</p>
    )
};