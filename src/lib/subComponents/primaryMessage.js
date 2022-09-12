import React from "react";

export const PrimaryMessage = ({ primaryMessage }) => {
    return (
        <>
            {
                !primaryMessage ? '' :
                (
                        <div className="alert alert-primary mt-2 mb-2">
                        <strong>Info!</strong> {primaryMessage}
                    </div>
                )
            }
        </>
    )
};