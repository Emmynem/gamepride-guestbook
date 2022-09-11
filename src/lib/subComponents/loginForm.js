import React from "react";
import { LoginBtn, ErrMessage, SuccessMessage } from "./index";
import { useAdminLogin } from '../hooks/useAdmin';

export const LoginForm = () => {

    const {
        email, 
        password,
        errorEmail,
        errorPassword,
        errorLogin,
        successLogin,
        cookie,
        handleEmail,
        handlePassword,
        handleSubmit
    } = useAdminLogin();

    return (
        <>
            <div className="container mt-6">
                <h3>Admin</h3>
                <div className="card mt-5 mb-5">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <form>
                            <div className="form-input">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    id="email_login"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleEmail}
                                    value={email}
                                />
                                <ErrMessage errorMessage={errorEmail} />
                            </div>

                            <div className="form-input">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    className="form-control mt-2"
                                    id="password_login"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={handlePassword}
                                    value={password}
                                />
                                <ErrMessage errorMessage={errorPassword} />
                            </div>

                            <div className="col-12 col-lg-6">
                                <ErrMessage errorMessage={errorLogin} />
                                <SuccessMessage successMessage={successLogin} />
                            </div>

                            <LoginBtn handleSubmit={handleSubmit} cookie={cookie} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};