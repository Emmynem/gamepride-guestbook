import React from "react";
import { useLocation } from "react-router-dom";
import { useEditAdmin } from "../hooks/useAdmin";
import useCookie from "../hooks/useCookie";
import { ErrMessage, SuccessMessage, Loading, ErrMap } from "../subComponents";

const EditAdminForm = () => {

    const [cookie] = useCookie(config.token, "");
    const { pathname } = useLocation();
    const unique_id = pathname.replace("/admin/edit/", "");

    const {
        firstname, lastname, errorEditAdmin, successEditAdmin, loading, loadingAdmin, adminFound,
        handleFirstname, handleLastname, handleSubmitEditAdmin
    } = useEditAdmin(cookie, unique_id);

    return (
        <>
            {
                loadingAdmin ?
                (<Loading show={loadingAdmin} />) :
                (
                    !adminFound ?
                    (
                        <div className="container mt-6">
                            <h3>Admins</h3>
                            <div className="card mt-5 mb-5">
                                <div className="card-header">Edit admin</div>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-4 col-sm-12 mt-2">
                                                <label htmlFor="firstname_edit_admin">Firstname:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstname_edit_admin"
                                                    placeholder="Enter firstname"
                                                    name="firstname"
                                                    onChange={handleFirstname}
                                                    value={firstname}
                                                />
                                            </div>
                                            <div className="col-md-4 col-sm-12 mt-2">
                                                <label htmlFor="lastname_edit_admin">Lastname:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastname_edit_admin"
                                                    placeholder="Enter lastname"
                                                    name="lastname"
                                                    onChange={handleLastname}
                                                    value={lastname}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col mt-4">
                                                <ErrMessage errorMessage={errorEditAdmin} />
                                                <SuccessMessage successMessage={successEditAdmin} />
                                            </div>
                                            <div className="col mt-4">
                                                <button type="button" onClick={handleSubmitEditAdmin} className="btn btn-success">
                                                    {
                                                        !loading ? '' : (
                                                            <div className="spinner-border text-light spinner-border-sm"></div>
                                                        )
                                                    }
                                                    Edit Admin
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) :
                    (<ErrMap err={adminFound} />)
                )
            }
        </>
    )
};

export default EditAdminForm;