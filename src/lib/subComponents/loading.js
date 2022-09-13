import React from "react";

export const Loading = ({ show }) => {
    return (
        <>
            {
                !show ? '' : (
                    <center>
                        <div className="spinner-border text-primary p-5" style={{margin: '200px 0px'}}></div>
                    </center>
                )
            }
        </>
    )
};