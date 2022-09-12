import React from "react";
import { AdminNav, GuestsTable, Footer } from "../subComponents";

export const Guests = () => {
    return (
        <>
            <AdminNav activeRoute={"guests"} />
            <GuestsTable />
            <Footer />
        </>
    )
};
