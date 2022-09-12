import React from "react";

export const Nav = ({ activeRoute }) => {
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
                                <a className={`nav-link ${activeRoute === 'guest/signup' ? 'active' : ''}`} href="/guest/signup">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeRoute === 'backoffice/login' ? 'active' : ''}`} href="/backoffice/login">Admin Login</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};