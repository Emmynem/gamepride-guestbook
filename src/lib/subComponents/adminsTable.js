import React from "react";
import { Link } from "react-router-dom";

export const AdminsTable = (_entities) => {
    const { entities } = _entities;

    return (
        <table className="table table-light table-hover">
            <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {entities.map((data, i) => (
                    <tr key={i}>
                        <td>{data.firstname}</td>
                        <td>{data.lastname}</td>
                        <td>{data.email}</td>
                        <td>
                            <Link to={`/edit-admin/${data.id}`}>
                                <button className='btn btn-warning'>Edit</button>
                            </Link>
                        </td>
                        <td>
                            <button className='btn btn-danger' data-toggle="modal" data-target="#myModal">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};