import React from "react";

export const ErrMap = ({ err }) => {
    return (
        <center>
            <div className="alert alert-danger">
                <strong>Error!</strong> {!err ? '' : err}
            </div>
        </center>
    )
};