import React from "react";

export const LoginBtn = ({handleSubmit, cookie}) => {
    return (
        <div className="clearfix">
            <input type="submit" value={cookie && cookie !== '[object Object]' ? 'Logged In' : 'Login'} onClick={handleSubmit} disabled={cookie && cookie !== '[object Object]' ? true : false} className={cookie && cookie !== '[object Object]' ? 'btn btn-primary mt-3' : "btn btn-success mt-3"} />
        </div>
    )
};