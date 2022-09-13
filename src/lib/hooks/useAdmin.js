import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCookie from './useCookie';
import { addAdmin, adminLogin, editAdmin, getAdmin, deleteAdmin, getAdmins } from "../api/admin";
import { config } from "../config";

const useGetAdmins = (token) => {

    const [admins, setAdmins] = useState([]);
    const [errorAdmins, setErrorAdmins] = useState(null);
    const [loading_data, setLoading] = useState(true);

    const adminsRes = getAdmins(token);

    useEffect(() => {
        adminsRes.then(res => {
            setLoading(false);
            if (res.err) {
                if(!res.error.response.data.success) {
                    const error = `${res.error.response.data.message}`;
                    setLoading(false);
                    setErrorAdmins(error);
                } else {
                    const error = `${res.error.code} - ${res.error.message}`;
                    setLoading(false);
                    setErrorAdmins(error);
                }
            } else {
                setErrorAdmins(null);
                setLoading(false);
                setAdmins(res.data.data.rows);
            }
        }).catch(err => {
            setLoading(false);
        })

    }, []);

    return { admins, loading_data, errorAdmins };
};

const useAdminLogin = () => {

    const [loading, setLoading] = useState(false);

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
            setLoading(true);

            const loginRes = adminLogin({ email, password })

            loginRes.then(res => {
                setLoading(false);
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
                        navigate("/guests");
                        window.location.reload(true);
                    }, 2000)
                }
            }).catch(err => {
                setLoading(false);
            })

        }
    };

    return {
        email, password, errorEmail, errorPassword, errorLogin, successLogin, cookie, loading,
        handleEmail, handlePassword, handleSubmit
    };
};

const useAddAdmin = (token) => {

    const [loading, setLoading] = useState(false);
    const baseValidationText = config.baseValidationText;

    // declaring and initializing (to null) values
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // error & success prompts
    const [errorAddAdmin, setErrorAddAdmin] = useState(null);
    const [successAddAdmin, setSuccessAddAdmin] = useState(null);

    // validating values that need precision
    const validName = new RegExp(config.NAME_REGEX);
    const validEmail = new RegExp(config.EMAIL_REGEX);
    const validPassword = new RegExp(config.PASSWORD_REGEX);
    
    const navigate = useNavigate();
    
    // handling all onChange states
    const handleFirstname = (e) => { e.preventDefault(); setFirstname(e.target.value) };
    const handleLastname = (e) => { e.preventDefault(); setLastname(e.target.value) };
    const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
    const handlePassword = (e) => { e.preventDefault(); setPassword(e.target.value) };
    const handleConfirmPassword = (e) => { e.preventDefault(); setConfirmPassword(e.target.value) };

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
        } else if (confirmPassword.length === 0) {
            setErrorAddAdmin(baseValidationText + "Confirm password is required");
        } else if (!validPassword.test(confirmPassword)) {
            setErrorAddAdmin(baseValidationText + "Invalid password (at least 1 uppercase, lowercase and digit)");
        } else if (confirmPassword !== password) {
            setErrorAddAdmin(baseValidationText + "Passwords are different");
        } else {
            setErrorAddAdmin(null);
            setLoading(true);
            
            const addAdminRes = addAdmin(token, {
                email,
                password,
                firstname,
                lastname,
                confirmPassword
            })

            addAdminRes.then(res => {
                setLoading(false);
                if (res.err) {
                    if (!res.error.response.data.success) {
                        const error = `${res.error.responsedata.message} - ${res.error.response.data.data[0].msg}`;
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
                    setSuccessAddAdmin("Admin Added successfully ...");

                    setTimeout(function () {
                        navigate("/admins");
                    }, 3000)
                }
            }).catch(err => {
                setLoading(false);
            })
        }

    };

    return {
        firstname, lastname, email, password, confirmPassword, errorAddAdmin, successAddAdmin, loading,
        handleFirstname, handleLastname, handleEmail, handlePassword, handleConfirmPassword, handleSubmitAddAdmin
    };

};

const useEditAdmin = (token, unique_id) => {

    const [loading, setLoading] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(true);
    const baseValidationText = config.baseValidationText;

    const [adminFound, setAdminFound] = useState(null);

    // declaring and initializing (to null) values
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    
    const findAdmin = getAdmin(token, unique_id);
    
    useEffect(() => {
        findAdmin.then(res => {
            setLoadingAdmin(false);
            if (res.err) {
                if (!res.error.response.data.success) {
                    const error = `${res.error.responsedata.message} - ${res.error.response.data.data[0].msg}`;
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
            setLoadingAdmin(false);
        })
    }, []);

    // error & success prompts
    const [errorEditAdmin, setErrorEditAdmin] = useState(null);
    const [successEditAdmin, setSuccessEditAdmin] = useState(null);

    // validating values that need precision
    const validName = new RegExp(config.NAME_REGEX);

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
            setLoading(true);
            
            const editAdminRes = editAdmin(token, {
                firstname,
                lastname,
                unique_id
            })

            editAdminRes.then(res => {
                setLoading(false);
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
                    setSuccessEditAdmin("Admin Edited successfully ...");

                    setTimeout(function () {
                        navigate("/admins");
                    }, 3000)
                }
            }).catch(err => {
                setLoading(false);
            })
        }

    };

    return {
        firstname, lastname, errorEditAdmin, successEditAdmin, adminFound, loading, loadingAdmin,
        handleFirstname, handleLastname, handleSubmitEditAdmin
    };

};

const useDeleteAdmin = (token) => {
    
    const [loading, setLoading] = useState(false);

    const [unique_id, setUniqueId] = useState(null);
    
    // error & success prompts
    const [errorDeleteAdmin, setErrorDeleteAdmin] = useState(null);
    const [successDeleteAdmin, setSuccessDeleteAdmin] = useState(null);
    
    const handleDelete = () => {
        setLoading(true);
        
        const deleteAdminRes = deleteAdmin(token, {
            unique_id,
            token
        })
    
        deleteAdminRes.then(res => {
            setLoading(false);
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
                setSuccessDeleteAdmin("Admin Deleted successfully ...");
    
                setTimeout(function () {
                    window.location.reload(true);
                }, 3000)
            }
        }).catch(err => {
            setLoading(false);
        })

    };

    return {
        errorDeleteAdmin, successDeleteAdmin, loading, handleDelete, setUniqueId
    };

};

export { useAdminLogin, useAddAdmin, useEditAdmin, useDeleteAdmin, useGetAdmins };