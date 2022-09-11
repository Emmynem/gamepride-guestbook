import React from "react";

export const ErrMessage = ({ errorMessage }) => {
    return (
        <p className='text-danger' placeholder="err_message">{!errorMessage ? '' : errorMessage}</p>
    )
};