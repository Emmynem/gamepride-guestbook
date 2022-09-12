import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteGuest, guestSignup } from "../api/guest";
import { guestDeleted } from "../slice/guest";
import { config } from "../config";

const useGuestSignUp = () => {

    const [loading, setLoading] = useState(false);
    const baseValidationText = config.baseValidationText;

    // declaring and initializing (to null) values
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [check_in, setCheckIn] = useState("");

    // error & success prompts
    const [errorGuestSignup, setErrorGuestSignup] = useState(null);
    const [successGuestSignup, setSuccessGuestSignup] = useState(null);

    // validating values that need precision
    const validName = new RegExp(config.NAME_REGEX);
    const validEmail = new RegExp(config.EMAIL_REGEX);
    const validPhone = new RegExp(config.PHONE_REGEX);
    const validateDate = (date) => {
        const d = new Date(date);
        const today = new Date();
        today.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });        
        if (d === "Invalid Date") return false;
        if (today.getTime() > d.getTime()) return false;
        return true;
    };

    // handling all onChange states
    const handleFirstname = (e) => { e.preventDefault(); setErrorGuestSignup(null); setSuccessGuestSignup(null); setFirstname(e.target.value) };
    const handleMiddlename = (e) => { e.preventDefault(); setMiddlename(e.target.value) };
    const handleLastname = (e) => { e.preventDefault(); setLastname(e.target.value) };
    const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
    const handlePhone = (e) => { e.preventDefault(); setPhone(e.target.value) };
    const handleCheckIn = (e) => { e.preventDefault(); setCheckIn(e.target.value) };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (firstname.length === 0) {
            setErrorGuestSignup(null);
            setSuccessGuestSignup(null);
            setErrorGuestSignup(baseValidationText + "Firstname is required");
        } else if (!validName.test(firstname)) {
            setErrorGuestSignup(baseValidationText + "Invalid Firstname");
        } else if (middlename.length !== 0 && !validName.test(middlename)) {
            setErrorGuestSignup(baseValidationText + "Invalid Middlename");
        } else if (lastname.length === 0) {
            setErrorGuestSignup(baseValidationText + "Lastname is required");
        } else if (!validName.test(lastname)) {
            setErrorGuestSignup(baseValidationText + "Invalid Lastname");
        } else if (email.length === 0) {
            setErrorGuestSignup(baseValidationText + "Email is required");
        } else if (!validEmail.test(email)) {
            setErrorGuestSignup(baseValidationText + "Invalid email");
        } else if (phone.length === 0) {
            setErrorGuestSignup(baseValidationText + "Phone is required");
        } else if (!validPhone.test(phone)) {
            setErrorGuestSignup(baseValidationText + "Invalid Phone");
        } else if (check_in.length === 0) {
            setErrorGuestSignup(baseValidationText + "Check In is required");
        } else if (!validateDate(check_in)) {
            setErrorGuestSignup(baseValidationText + "Invalid check-in datetime (note: Timezone +01:00)");
        } else {
            setErrorGuestSignup(null);
            setLoading(true);
            
            const guestSignupRes = guestSignup({ 
                firstname,
                middlename: middlename.length === 0 ? undefined : middlename,
                lastname,
                email,
                phone,
                check_in
            })

            guestSignupRes.then(res => {
                setLoading(false);
                if (res.err) {
                    if (!res.error.response.data.success) {
                        const error = `${res.error.response.data.message}`;
                        setErrorGuestSignup(error);
                        setTimeout(function () {
                            setErrorGuestSignup(null);
                        }, 2000)
                    } else {
                        const error = `${res.error.code} - ${res.error.message}`;
                        setErrorGuestSignup(error);
                        setTimeout(function () {
                            setErrorGuestSignup(null);
                        }, 2000)
                    }
                } else {
                    setErrorGuestSignup(null);
                    setSuccessGuestSignup(`${res.data.message} - ID = ${res.data.data.unique_id}`);
                    
                    setFirstname("");
                    setMiddlename("");
                    setLastname("");
                    setEmail("");
                    setPhone("");
                    setCheckIn("");
                }
            }).catch(err => {
                setLoading(false);
            })

        }
    };

    return {
        email, firstname, lastname, middlename, phone, check_in, errorGuestSignup, successGuestSignup, loading,
        handleEmail, handleFirstname, handleLastname, handleMiddlename, handlePhone, handleCheckIn, handleSubmit
    };
};

const useDeleteGuest = (token) => {

    const [loading, setLoading] = useState(true);

    const [unique_id, setUniqueId] = useState(null);

    // hooks
    const dispatch = useDispatch();

    // error & success prompts
    const [errorDeleteGuest, setErrorDeleteGuest] = useState(null);
    const [successDeleteGuest, setSuccessDeleteGuest] = useState(null);
    
    const handleDelete = (e) => {
        e.preventDefault();

        const deleteGuestRes = deleteGuest(token, {
            unique_id
        })

        deleteGuestRes.then(res => {
            setLoading(false);
            if (res.err) {
                if (!res.error.response.data.success) {
                    const error = `${res.error.response.data.message}`;
                    setErrorDeleteGuest(error);
                    setTimeout(function () {
                        setErrorDeleteGuest(null);
                    }, 2000)
                } else {
                    const error = `${res.error.code} - ${res.error.message}`;
                    setErrorDeleteGuest(error);
                    setTimeout(function () {
                        setErrorDeleteGuest(null);
                    }, 2000)
                }
            } else {
                setErrorDeleteGuest(null);
                dispatch(guestDeleted({ unique_id }));
                setSuccessDeleteGuest("Guest Deleted successfully ...");
    
                setTimeout(function () {
                    window.location.reload(true);
                }, 3000)
            }
        }).catch(err => {
            setLoading(false);
        })
    };


    return {
        errorDeleteGuest, successDeleteGuest, loading, handleDelete, setUniqueId
    };

};

export { useGuestSignUp, useDeleteGuest };