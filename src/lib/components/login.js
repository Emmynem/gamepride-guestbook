import React from "react";
import { Nav, LoginForm, Footer } from "../subComponents";

export const Login = () => {
    return (
        <>
            <Nav activeRoute={"login"} />
            <LoginForm />
            <Footer />
        </>
    )
};
