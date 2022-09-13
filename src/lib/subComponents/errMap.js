import React from "react";

export const ErrMap = ({ err }) => {
    return (
        <>
            {
                !err ? '' :
                (
                    <div className="alert alert-danger mt-2 mb-2">
                        <strong>Error!</strong> {err}
                    </div>
                )
            }
        </>
    )
};