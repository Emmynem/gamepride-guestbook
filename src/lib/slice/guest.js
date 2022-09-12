import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGuests } from '../api/guest';

export const fetchGuests = createAsyncThunk("guests/fetchGuests", async (token) => {
    const response = getGuests(token);
    const guests = await response.json();
    return guests;
});

const guestSlice = createSlice({
    name: "guests",
    initialState: {
        entities: [],
        loading_data: false
    },
    reducers: {
        guestDeleted(state, action) {
            const { unique_id } = action.payload;
            const existingGuest = state.entities.find((guest) => guest.unique_id === unique_id);
            if (existingGuest) {
                state.entities = state.entities.filter((guest) => guest.unique_id !== unique_id);
            }
        },
    },
    extraReducers: {
        [fetchGuests.pending]: (state, action) => {
            state.loading_data = true;
        },
        [fetchGuests.fulfilled]: (state, action) => {
            state.loading_data = false;
            state.entities = [...state.entities, ...action.payload];
        },
        [fetchGuests.rejected]: (state, action) => {
            state.loading_data = false;
        },
    },
});

export const { guestDeleted } = guestSlice.actions;

export default guestSlice.reducer;