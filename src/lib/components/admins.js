import React from "react";
import { AdminNav, AdminsTable, Footer } from "../subComponents";

export const Admins = () => {
    return (
        <>
            <AdminNav activeRoute={"admins"} />
            <AdminsTable />
            <Footer />
        </>
    )
};
