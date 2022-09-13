import React from "react";
import { AdminNav, EditAdminForm, Footer } from "../subComponents";

export const EditAdmin = () => {
    return (
        <>
            <AdminNav activeRoute={"admins"} />
            <EditAdminForm />
            <Footer />
        </>
    )
};
