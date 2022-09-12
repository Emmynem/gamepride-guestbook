import React from "react";
import { config } from "../config";
import useCookie from "../hooks/useCookie";

export const AdminNav = ({ activeRoute }) => {
    const [cookie, removeCookie] = useCookie(config.token, "");

    return (
        <>
            <header className="header" id="header">
                <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
                    <a className="navbar-brand" href="/">Guest Book</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className={`nav-link ${activeRoute === 'guests' ? 'active' : ''}`} href="/guests">Guests</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeRoute === 'admins' ? 'active' : ''}`} href="/admins">Admins</a>
                            </li>
                            <li className="nav-item">
                                {
                                    cookie && cookie !== '[object Object]' ? (
                                        <a href="/" className="nav-link icon" onClick={removeCookie}>
                                            <span className="fas fa-sign-out-alt"></span> Logout
                                        </a>
                                    ) : (
                                        <a href="/backoffice/login" className="nav-link icon">
                                            <span className="fas fa-sign-in-alt"></span> Login
                                        </a>
                                    )
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
                
            </header>

        </>
    );
};