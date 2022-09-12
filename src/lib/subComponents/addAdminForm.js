import React from "react";
import { useAddAdmin } from "../hooks/useAdmin";
import useCookie from "../hooks/useCookie";
import { ErrMessage, SuccessMessage } from "../subComponents";

const AddAdminForm = () => {

    const [cookie] = useCookie(config.token, "");

    const {
        firstname, lastname, email, password, confirmPassword, errorAddAdmin, successAddAdmin, loading,
        handleFirstname, handleLastname, handleEmail, handlePassword, handleConfirmPassword, handleSubmitAddAdmin
    } = useAddAdmin(cookie);

    return (
        <>
            <div className="container mt-6">
                <h3>Admins</h3>
                <div className="card mt-5 mb-5">
                    <div className="card-header">Add new admin</div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 mt-2">
                                    <label htmlFor="firstname_add_admin">Firstname:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstname_add_admin"
                                        placeholder="Enter firstname"
                                        name="firstname"
                                        onChange={handleFirstname}
                                        value={firstname}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 mt-2">
                                    <label htmlFor="lastname_add_admin">Lastname:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastname_add_admin"
                                        placeholder="Enter lastname"
                                        name="lastname"
                                        onChange={handleLastname}
                                        value={lastname}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mt-2">
                                    <label htmlFor="email_add_admin">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email_add_admin"
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={handleEmail}
                                        value={email}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 mt-2">
                                    <label htmlFor="password_add_admin">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password_add_admin"
                                        placeholder="Enter password"
                                        name="password"
                                        onChange={handlePassword}
                                        value={password}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12 mt-2">
                                    <label htmlFor="confirm_password_add_admin">Confirm Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirm_password_add_admin"
                                        placeholder="Confirm password"
                                        name="confirmPassword"
                                        onChange={handleConfirmPassword}
                                        value={confirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mt-4">
                                    <ErrMessage errorMessage={errorAddAdmin} />
                                    <SuccessMessage successMessage={successAddAdmin} />
                                </div>
                                <div className="col mt-4">
                                    <button type="button" onClick={handleSubmitAddAdmin} className="btn btn-success">
                                        {
                                            !loading ? '' : (
                                                <div className="spinner-border text-light spinner-border-sm"></div>
                                            )
                                        }
                                        Add Admin
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddAdminForm;