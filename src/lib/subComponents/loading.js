import React from "react";

export const Loading = ({ show }) => {
    return (
        <>
            {
                !show ? '' : (
                    <center>
                        <div className="col-md-6 col-md-offset-3 mt-6 mb-6">
                            <div className="progress progress-lg">
                                <div className="progress-bar progress-bar-success active progress-bar-striped" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100.00%'}} role="progressbar"> Loading ...</div>
                            </div>
                        </div>
                    </center>
                )
            }
        </>
    )
};