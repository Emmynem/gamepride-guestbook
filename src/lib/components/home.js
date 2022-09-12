import React from "react";
import { Nav, GuestSignUpForm, Footer } from "../subComponents";

export const Home = () => {
    return (
        <>
            <Nav activeRoute={"guest/signup"} />
            <GuestSignUpForm />
            <Footer />
        </>
    )
};
