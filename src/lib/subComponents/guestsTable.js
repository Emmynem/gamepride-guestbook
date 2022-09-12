import React from "react";
import { useSelector } from "react-redux";
import useCookie from "../hooks/useCookie";
import { useDeleteGuest } from '../hooks/useGuest';
import { DeleteModal, Loading, ErrMap } from "./";

export const GuestsTable = () => {
    
    const { entities, loading_data } = useSelector((state) => state.guests);
    const [cookie] = useCookie(config.token, "");

    const { errorDeleteGuest, handleDelete, loading, successDeleteGuest, setUniqueId } = useDeleteGuest(cookie);

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
                                entities.length === 0 ?
                                (<ErrMap err={`No records`} />) :
                                (
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
                                            {entities.map((data, i) => (
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{data.firstname + (data.middlename !== null ? " " + data.middlename + " " : " ") + data.lastname}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.phone}</td>
                                                    <td>{data.checkin}</td>
                                                    <td>{data.createdAt}</td>
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

            <DeleteModal handleDelete={handleDelete} loading={loading} errorMessage={errorDeleteGuest} successMessage={successDeleteGuest} />
        </>
    )
};