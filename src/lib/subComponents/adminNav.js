import React from "react";
import { config } from "../config";
import useCookie from "../hooks/useCookie";

export const AdminNav = ({ activeRoute }) => {
    const [cookie, removeCookie] = useCookie(config.token, "");

    return (
        <>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">Guest Book</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className={`${activeRoute === 'guests' ? 'active' : ''}`}><a href="/guests">Guests</a></li>
                        <li className={`${activeRoute === 'admins' ? 'active' : ''}`}><a href="/admins">Admins</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            {
                                cookie && cookie !== '[object Object]' ? (
                                    <a href="/" onClick={removeCookie}>
                                        <span className="glyphicon glyphicon-log-out"></span> Logout
                                    </a>
                                ) : (
                                    <a href="/backoffice/login" className="icon mt-3">
                                        <span className="glyphicon glyphicon-log-in"></span> Login
                                    </a>
                                )
                            }
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    );
};