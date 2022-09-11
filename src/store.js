import { configureStore } from "@reduxjs/toolkit";
import adminsReducer from "./lib/slice/admin";
import guestsReducer from "./lib/slice/guest";

export default configureStore({
    reducer: {
        admins: adminsReducer,
        guests: guestsReducer,
    },
});