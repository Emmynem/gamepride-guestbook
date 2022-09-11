import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAdmins } from '../api/admin';

export const fetchAdmins = createAsyncThunk("admins/fetchAdmins", async (token) => {
    const response = getAdmins(token);
    const admins = await response.json();
    return admins;
});

const adminSlice = createSlice({
    name: "admins",
    initialState: {
        entities: [],
        loading: false
    },
    reducers: {
        adminAdded(state, action) {
            state.entities.push(action.payload);
        },
        adminUpdated(state, action) {
            const { unique_id, firstname, lastname } = action.payload;
            const existingAdmin = state.entities.find((admin) => admin.unique_id === unique_id);
            if (existingAdmin) {
                existingAdmin.firstname = firstname;
                existingAdmin.lastname = lastname;
            }
        },
        adminDeleted(state, action) {
            const { unique_id } = action.payload;
            const existingAdmin = state.entities.find((admin) => admin.unique_id === unique_id);
            if (existingAdmin) {
                state.entities = state.entities.filter((admin) => admin.unique_id !== unique_id);
            }
        },
    },
    extraReducers: {
        [fetchAdmins.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAdmins.fulfilled]: (state, action) => {
            state.loading = false;
            state.entities = [...state.entities, ...action.payload];
        },
        [fetchAdmins.rejected]: (state, action) => {
            state.loading = false;
        },
    },
});

export const { adminAdded, adminDeleted, adminUpdated } = adminSlice.actions;

export default adminSlice.reducer;