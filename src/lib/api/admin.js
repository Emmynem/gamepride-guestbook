import axios from 'axios';
import { config } from '../config';

const adminLogin = async function (payload) {
    try {
        const response = await axios.post(
            `${config.baseAPIurl}/auth/backoffice/signin`,
            { ...payload }
        );
        return { err: false, data: response.data };
    } catch (error) {
        return { err: true, error };
    }
};

const getAdmins = async function (token) {
    try {
        const response = await axios.get(
            `${config.baseAPIurl}/backoffice/admins`, 
            {
                headers: {
                    'x-access-token': token
                }
            }
        );
        return { err: false, data: response.data };
    } catch (error) {
        return { err: true, error };
    }
};

const getAdmin = async function (token, unique_id) {
    try {
        const response = await axios.get(
            `${config.baseAPIurl}/backoffice/admin?token=${token}&unique_id=${unique_id}`,
            {
                unique_id: unique_id
            },
            {
                headers: {
                    'x-access-token': token
                }
            }
        );
        return { err: false, data: response.data };
    } catch (error) {
        return { err: true, error };
    }
};

const addAdmin = async function (token, payload) {
    try {
        const response = await axios.post(
            `${config.baseAPIurl}/backoffice/admin`,
            {
                ...payload
            },
            {
                headers: {
                    'x-access-token': token
                }
            }
        );
        return { err: false, data: response.data };
    } catch (error) {
        return { err: true, error };
    }
};

const editAdmin = async function (token, payload) {
    try {
        const response = await axios.put(
            `${config.baseAPIurl}/backoffice/admin?token=${payload.token}&unique_id=${payload.unique_id}`,
            {
                ...payload
            },
            {
                headers: {
                    'x-access-token': token
                }
            }
        );
        return { err: false, data: response.data };
    } catch (error) {
        return { err: true, error };
    }
};

const deleteAdmin = async function (token, payload) {
    try {
        const response = await axios.delete(
            `${config.baseAPIurl}/backoffice/admin?token=${payload.token}&unique_id=${payload.unique_id}`,
            {
                ...payload
            },
            {
                headers: {
                    'x-access-token': token
                }
            }
        );
        return { err: false, data: response.data };
    } catch (error) {
        return { err: true, error };
    }
};

export { addAdmin, adminLogin, deleteAdmin, editAdmin, getAdmin, getAdmins };