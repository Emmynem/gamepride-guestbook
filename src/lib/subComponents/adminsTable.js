import React from "react";
import { Link } from "react-router-dom";
import { Loading, ErrMap } from "./";
import { useDeleteAdmin, useGetAdmins } from '../hooks/useAdmin';
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { PrimaryMessage } from "./primaryMessage";
import { SuccessMessage } from "./successMessage";

export const AdminsTable = () => {

    const [cookie] = useCookie(config.token, "");
    const { errorAdmins, admins, loading_data } = useGetAdmins(cookie);

    const { errorDeleteAdmin, handleDelete, loading, successDeleteAdmin, setUniqueId } = useDeleteAdmin(cookie);

    const openDeleteModal = function () {
        document.getElementById("deleteModal").style.display = "block";
    };

    const closeDeleteModal = function () {
        document.getElementById("deleteModal").style.display = "none";
    };

    return (
        <>
            <div className="container mt-6">
                <h3>Admins</h3>
                <div className="card mt-5 mb-5">
                    <div className="card-header clearfix">
                        <Link to="/admin/add">
                            <button className='btn btn-primary float-end'>New</button>
                        </Link>
                    </div>
                    <div className="card-body">
                        {
                            loading_data ?
                            (<Loading show={loading_data} />) :
                            (
                                errorAdmins ?
                                (<ErrMap err={errorAdmins} />) :
                                (
                                    <div className="table-responsive">
                                        <table className="table table-light table-hover">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Firstname</th>
                                                    <th>Lastname</th>
                                                    <th>Email</th>
                                                    <th>Added</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {admins.map((data, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.firstname}</td>
                                                        <td>{data.lastname}</td>
                                                        <td>{data.email}</td>
                                                        <td>{data.createdAt}</td>
                                                        <td>
                                                            <Link to={`/admin/edit/${data.unique_id}`}>
                                                                <button className='btn btn-warning'>Edit</button>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button className='btn btn-danger' onClick={() => { setUniqueId(data.unique_id); openDeleteModal();}} data-toggle="modal" data-target="#deleteModal">Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="modal" id="deleteModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Delete Confirmation</h4>
                            <button type="button" className="close" onClick={closeDeleteModal} data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <p>Are you sure you want to delete this item ?</p>
                            <PrimaryMessage primaryMessage={errorDeleteAdmin} />
                            <SuccessMessage successMessage={successDeleteAdmin} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" onClick={handleDelete} className="btn btn-success">
                                {
                                    !loading ? '' : (
                                        <div className="spinner-border text-light spinner-border-sm"></div>
                                    )
                                }
                                &nbsp; Yes
                            </button>
                            <button type="button" className="btn btn-danger" onClick={closeDeleteModal} data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
};