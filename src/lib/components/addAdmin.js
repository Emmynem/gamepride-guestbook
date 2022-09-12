import React from "react";
import { AdminNav, AddAdminForm, Footer } from "../subComponents";

export const AddAdmin = () => {
    return (
        <>
            <AdminNav activeRoute={"admins"} />
            <AddAdminForm />
            <Footer />
        </>
    )
};
