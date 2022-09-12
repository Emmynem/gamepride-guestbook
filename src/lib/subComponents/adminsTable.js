import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteModal, Loading, ErrMap } from "./";
import { useDeleteAdmin } from '../hooks/useAdmin';
import useCookie from "../hooks/useCookie";
import { config } from "../config";

export const AdminsTable = () => {

    const { entities, loading_data } = useSelector((state) => state.admins);
    const [cookie] = useCookie(config.token, "");

    const { errorDeleteAdmin, handleDelete, loading, successDeleteAdmin, setUniqueId } = useDeleteAdmin(cookie);

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
                                entities.length === 0 ?
                                (<ErrMap err={`No records`} />) :
                                (
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
                                            {entities.map((data, i) => (
                                                <tr key={i}>
                                                    <td>{i}</td>
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
                                                        <button className='btn btn-danger' onClick={() => setUniqueId(data.unique_id)} data-toggle="modal" data-target="#deleteModal">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            <DeleteModal handleDelete={handleDelete} loading={loading} errorMessage={errorDeleteAdmin} successMessage={successDeleteAdmin} />
        </>
    )
};