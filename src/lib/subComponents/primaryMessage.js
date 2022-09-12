import React from "react";

export const PrimaryMessage = ({ primaryMessage }) => {
    return (
        <div className="alert alert-primary">
            <strong>Info!</strong> {!primaryMessage ? '' : primaryMessage}
        </div>
    )
};