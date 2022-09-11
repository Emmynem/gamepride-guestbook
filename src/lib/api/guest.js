import axios from 'axios';
import { config } from '../config';

const guestSignup = async function (payload) {
    try {
        const response = await axios.post(
            `${config.baseAPIurl}/guest/signup`,
            { ...payload }
        );
        return { err: false, data: response.data };
    } catch (error) {
        return { err: true, error };
    }
};

const getGuests = async function (token) {
    try {
        const response = await axios.get(
            `${config.baseAPIurl}/guests`,
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
}

const getGuest = async function (token, unique_id) {
    try {
        const response = await axios.get(
            `${config.baseAPIurl}/guest`,
            {
                unique_id
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

const deleteGuest = async function (token, payload) {
    try {
        const response = await axios.delete(
            `${config.baseAPIurl}/guest`,
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


export { deleteGuest, getGuest, getGuests, guestSignup };