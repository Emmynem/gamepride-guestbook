import React from "react";
import { useGuestSignUp } from "../hooks/useGuest";
import { ErrMessage, SuccessMessage } from "../subComponents";

const GuestSignUpForm = () => {

    const {
        email, firstname, lastname, middlename, phone, checkin, errorGuestSignup, successGuestSignup, loading,
        handleEmail, handleFirstname, handleLastname, handleMiddlename, handlePhone, handleCheckIn, handleSubmit
    } = useGuestSignUp();

    return (
        <>
            <div className="container mt-6">
                <h3>Guest Book</h3>
                <div className="card mt-5 mb-5">
                    <div className="card-header">Check In Form</div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 mt-2">
                                    <label htmlFor="firstname_guest_sign_up">Firstname:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstname_guest_sign_up"
                                        placeholder="Enter firstname"
                                        name="firstname"
                                        onChange={handleFirstname}
                                        value={firstname}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 mt-2">
                                    <label htmlFor="middlename_guest_sign_up">Middlename:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="middlename_guest_sign_up"
                                        placeholder="Enter middlename"
                                        name="middlename"
                                        onChange={handleMiddlename}
                                        value={middlename}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 mt-2">
                                    <label htmlFor="lastname_guest_sign_up">Lastname:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastname_guest_sign_up"
                                        placeholder="Enter lastname"
                                        name="lastname"
                                        onChange={handleLastname}
                                        value={lastname}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12 mt-2">
                                    <label htmlFor="email_guest_sign_up">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email_guest_sign_up"
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={handleEmail}
                                        value={email}
                                    />
                                </div>
                                <div className="col-md-6 col-sm-12 mt-2">
                                    <label htmlFor="phone_guest_sign_up">Phone:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone_guest_sign_up"
                                        placeholder="Enter phone"
                                        name="phone"
                                        onChange={handlePhone}
                                        value={phone}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mt-2">
                                    <label htmlFor="checkin_guest_sign_up">Check In Time:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="checkin_guest_sign_up"
                                        placeholder="Enter checkin"
                                        name="checkin"
                                        onChange={handleCheckIn}
                                        value={checkin}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mt-4">
                                    <ErrMessage errorMessage={errorGuestSignup} />
                                    <SuccessMessage successMessage={successGuestSignup} />
                                </div>
                                <div className="col mt-4">
                                    <button type="button" onClick={handleSubmit} className="btn btn-success">
                                        {
                                            !loading ? '' : (
                                                <div className="spinner-border text-light spinner-border-sm"></div>
                                            )
                                        }
                                        Check In
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

export default GuestSignUpForm;