import React from "react";

export const Loading = ({ show }) => {
    return (
        <>
            {
                !show ? '' : (
                    <center>
                        <div className="spinner-border text-primary p-5"></div>
                    </center>
                )
            }
        </>
    )
};