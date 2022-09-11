import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCookie from './useCookie';
import { addAdmin, adminLogin, editAdmin, getAdmin, deleteAdmin } from "../api/admin";
import { config } from "../config";
import { adminAdded, adminDeleted, adminUpdated } from "../slice/admin";

const useAdminLogin = () => {

    const [email, setEmail] = useState("johndoe@example.com");
    const [password, setPassword] = useState("John-Doe-1");
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);
    const [successLogin, setSuccessLogin] = useState(null);

    const [cookie, updateCookie] = useCookie(config.token, "");

    const navigate = useNavigate();

    const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
    const handlePassword = (e) => { e.preventDefault(); setPassword(e.target.value) };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.length === 0) {
            setErrorEmail("Email is required");
        }
        else if (password.length === 0) {
            setErrorEmail(null);
            setErrorPassword("Password is required");
        }
        else {
            setErrorPassword(null);

            const loginRes = adminLogin({ email, password })

            loginRes.then(res => {
                if (res.err) {
                    if(!res.error.response.data.success) {
                        const error = `${res.error.response.data.message}`;
                        setErrorLogin(error);
                        setTimeout(function () {
                            setErrorLogin(null);
                        }, 2000)
                    } else {
                        const error = `${res.error.code} - ${res.error.message}`;
                        setErrorLogin(error);
                        setTimeout(function () {
                            setErrorLogin(null);
                        }, 2000)
                    }
                } else {
                    setErrorLogin(null);
                    setSuccessLogin("Login successful ...");

                    setTimeout(function () {
                        updateCookie(res.data.data.token, 1);
                        navigate("/");
                        window.location.reload(true);
                    }, 2000)
                }
            }).catch(err => {
            })

        }
    };

    return {
        email, password, errorEmail, errorPassword, errorLogin, successLogin, cookie,
        handleEmail, handlePassword, handleSubmit
    };
};

const useAddAdmin = (token) => {

    const baseValidationText = config.baseValidationText;

    // declaring and initializing (to null) values
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // error & success prompts
    const [errorAddAdmin, setErrorAddAdmin] = useState(null);
    const [successAddAdmin, setSuccessAddAdmin] = useState(null);

    // validating values that need precision
    const validName = new RegExp(config.NAME_REGEX);
    const validEmail = new RegExp(config.EMAIL_REGEX);
    const validPassword = new RegExp(config.PASSWORD_REGEX);
    
    // hooks
    const dispatch = useDispatch();
    const adminsAmount = useSelector((state) => state.admins.entities.length);
    
    const navigate = useNavigate();
    
    // handling all onChange states
    const handleFirstname = (e) => { e.preventDefault(); setFirstname(e.target.value) };
    const handleLastname = (e) => { e.preventDefault(); setLastname(e.target.value) };
    const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
    const handlePassword = (e) => { e.preventDefault(); setPassword(e.target.value) };

    // handle form submit
    const handleSubmitAddAdmin = (e) => {
        e.preventDefault();

        // Form field validation
        if (firstname.length === 0) {
            setErrorAddAdmin(baseValidationText + "Firstname is required");
        } else if (!validName.test(firstname)) {
            setErrorAddAdmin(baseValidationText + "Invalid Firstname");
        } else if (lastname.length === 0) {
            setErrorAddAdmin(baseValidationText + "Lastname is required");
        } else if (!validName.test(lastname)) {
            setErrorAddAdmin(baseValidationText + "Invalid Lastname");
        } else if (email.length === 0) {
            setErrorAddAdmin(baseValidationText + "Email is required");
        } else if (!validEmail.test(email)) {
            setErrorAddAdmin(baseValidationText + "Invalid email");
        } else if (password.length === 0) {
            setErrorAddAdmin(baseValidationText + "Password is required");
        } else if (!validPassword.test(password)) {
            setErrorAddAdmin(baseValidationText + "Invalid password (at least 1 uppercase, lowercase and digit)");
        } else {
            setErrorAddAdmin(null);
            
            const addAdminRes = addAdmin(token, {
                email,
                password,
                firstname,
                lastname
            })

            addAdminRes.then(res => {
                if (res.err) {
                    if (!res.error.response.data.success) {
                        const error = `${res.error.response.data.message}`;
                        setErrorAddAdmin(error);
                        setTimeout(function () {
                            setErrorAddAdmin(null);
                        }, 2000)
                    } else {
                        const error = `${res.error.code} - ${res.error.message}`;
                        setErrorAddAdmin(error);
                        setTimeout(function () {
                            setErrorAddAdmin(null);
                        }, 2000)
                    }
                } else {
                    setErrorAddAdmin(null);
                    dispatch(
                        adminAdded({
                            id: adminsAmount + 1,
                            email,
                            firstname,
                            lastname
                        })
                    );
                    setSuccessAddAdmin("Admin Added successfully ...");

                    setTimeout(function () {
                        navigate("/all-admins");
                    }, 5000)
                }
            }).catch(err => {
            })
        }

    };

    return {
        firstname, lastname, email, password, errorAddAdmin, successAddAdmin,
        handleFirstname, handleLastname, handleEmail, handlePassword, handleSubmitAddAdmin
    };

};

const useEditAdmin = (token, unique_id) => {

    const baseValidationText = config.baseValidationText;

    const [adminFound, setAdminFound] = useState(null);

    // declaring and initializing (to null) values
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const findAdmin = getAdmin(token, unique_id);

    findAdmin.then(res => {
        if (res.err) {
            if (!res.error.response.data.success) {
                const error = `${res.error.response.data.message}`;
                setAdminFound(error);
            } else {
                const error = `${res.error.code} - ${res.error.message}`;
                setAdminFound(error);
            }
        } else {
            const admin = res.data.data;

            // declaring and initializing (to null) values
            setFirstname(admin.firstname);
            setLastname(admin.lastname);
        }
    }).catch(err => {
    })
    // useEffect(() => {
    // }, [findAdmin]);

    // error & success prompts
    const [errorEditAdmin, setErrorEditAdmin] = useState(null);
    const [successEditAdmin, setSuccessEditAdmin] = useState(null);

    // validating values that need precision
    const validName = new RegExp(config.NAME_REGEX);

    // hooks
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // handling all onChange states
    const handleFirstname = (e) => { e.preventDefault(); setFirstname(e.target.value) };
    const handleLastname = (e) => { e.preventDefault(); setLastname(e.target.value) };

    // handle form submit
    const handleSubmitEditAdmin = (e) => {
        e.preventDefault();

        // Form field validation
        if (firstname.length === 0) {
            setErrorEditAdmin(baseValidationText + "Firstname is required");
        } else if (!validName.test(firstname)) {
            setErrorEditAdmin(baseValidationText + "Invalid Firstname");
        } else if (lastname.length === 0) {
            setErrorEditAdmin(baseValidationText + "Lastname is required");
        } else if (!validName.test(lastname)) {
            setErrorEditAdmin(baseValidationText + "Invalid Lastname");
        } else {
            setErrorEditAdmin(null);

            const editAdminRes = editAdmin(token, {
                firstname,
                lastname,
                unique_id
            })

            editAdminRes.then(res => {
                if (res.err) {
                    if (!res.error.response.data.success) {
                        const error = `${res.error.response.data.message}`;
                        setErrorEditAdmin(error);
                        setTimeout(function () {
                            setErrorEditAdmin(null);
                        }, 2000)
                    } else {
                        const error = `${res.error.code} - ${res.error.message}`;
                        setErrorEditAdmin(error);
                        setTimeout(function () {
                            setErrorEditAdmin(null);
                        }, 2000)
                    }
                } else {
                    setErrorEditAdmin(null);
                    dispatch(
                        adminUpdated({
                            firstname,
                            lastname,
                            unique_id
                        })
                    );
                    setSuccessEditAdmin("Admin Edited successfully ...");

                    setTimeout(function () {
                        navigate("/all-admins");
                    }, 5000)
                }
            }).catch(err => {
            })
        }

    };

    return {
        firstname, lastname, errorEditAdmin, successEditAdmin, adminFound,
        handleFirstname, handleLastname, handleSubmitEditAdmin
    };

};

const useDeleteAdmin = (token, unique_id) => {

    // hooks
    const dispatch = useDispatch();

    // error & success prompts
    const [errorDeleteAdmin, setErrorDeleteAdmin] = useState(null);
    const [successDeleteAdmin, setSuccessDeleteAdmin] = useState(null);

    const deleteAdminRes = deleteAdmin(token, {
        unique_id
    })

    deleteAdminRes.then(res => {
        if (res.err) {
            if (!res.error.response.data.success) {
                const error = `${res.error.response.data.message}`;
                setErrorDeleteAdmin(error);
                setTimeout(function () {
                    setErrorDeleteAdmin(null);
                }, 2000)
            } else {
                const error = `${res.error.code} - ${res.error.message}`;
                setErrorDeleteAdmin(error);
                setTimeout(function () {
                    setErrorDeleteAdmin(null);
                }, 2000)
            }
        } else {
            setErrorDeleteAdmin(null);
            dispatch(adminDeleted({ unique_id }));
            setSuccessDeleteAdmin("Admin Deleted successfully ...");

            setTimeout(function () {
                window.location.reload(true);
            }, 5000)
        }
    }).catch(err => {
    })

    return {
        errorDeleteAdmin, successDeleteAdmin
    };

};

export { useAdminLogin, useAddAdmin, useEditAdmin, useDeleteAdmin };