import React from "react";

export const LoginBtn = ({handleSubmit, cookie, loading}) => {
    return (
        <div className="clearfix">
            <button 
                type="submit"
                onClick={handleSubmit} disabled={cookie && cookie !== '[object Object]' ? true : false}
                className={cookie && cookie !== '[object Object]' ? 'btn btn-primary mt-3' : "btn btn-success mt-3"}
            >
                {cookie && cookie !== '[object Object]' ? 'Logged In' : 'Login'}
                {
                    !loading ? '' : (
                        <div className="spinner-border text-light spinner-border-sm"></div>
                    )
                }
            </button>
        </div>
    )
};