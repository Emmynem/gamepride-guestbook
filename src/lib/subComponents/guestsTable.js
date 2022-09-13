import React from "react";
import { config } from "../config";
import useCookie from "../hooks/useCookie";
import { useDeleteGuest, useGetGuests } from '../hooks/useGuest';
import { Loading, ErrMap } from "./";
import { PrimaryMessage } from "./primaryMessage";
import { SuccessMessage } from "./successMessage";

export const GuestsTable = () => {
    
    const [cookie] = useCookie(config.token, "");
    const { errorGuests, guests, loading_data } = useGetGuests(cookie);

    const { errorDeleteGuest, handleDelete, loading, successDeleteGuest, setUniqueId } = useDeleteGuest(cookie);

    const openDeleteModal = function () {
        document.getElementById("deleteModal").style.display = "block";
    };

    const closeDeleteModal = function () {
        document.getElementById("deleteModal").style.display = "none";
    };

    return (
        <>
            <div className="container mt-6">
                <h3>Guests</h3>
                <div className="card mt-5 mb-5">
                    <div className="card-header">All guests</div>
                    <div className="card-body">
                        {
                            loading_data ?
                            (<Loading show={loading_data} />) :
                            (
                                errorGuests ?
                                (<ErrMap err={errorGuests} />) :
                                (
                                    <div className="table-responsive">
                                        <table className="table table-light table-hover">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Check In</th>
                                                    <th>Added</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    {guests.map((data, i) => (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.firstname + (data.middlename !== null ? " " + data.middlename + " " : " ") + data.lastname}</td>
                                                        <td>{data.email}</td>
                                                        <td>{data.phone === null ? 'No phone' : data.phone}</td>
                                                        <td>{data.check_in}</td>
                                                        <td>{data.createdAt}</td>
                                                        <td>
                                                            <button className='btn btn-danger' onClick={() => { setUniqueId(data.unique_id); openDeleteModal(); }} data-toggle="modal" data-target="#deleteModal">Delete</button>
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
                            <PrimaryMessage primaryMessage={errorDeleteGuest} />
                            <SuccessMessage successMessage={successDeleteGuest} />
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