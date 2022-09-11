import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import React from "react";
import { config } from "../config";
import useCookie from "../hooks/useCookie";
import { Layout, Login } from './index';

export default function App() {
    const [cookie] = useCookie(config.token, "");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="/backoffice/login" element={<Login />} />
                    {/* <Route path="/all-admins" element={
                        !cookie || cookie === '[object Object]' ?
                            (<Navigate replace to={"/"} />) :
                            (<Users />)
                    } />
                    <Route path="/add-admin" element={
                        !cookie || cookie === '[object Object]' ?
                            (<Navigate replace to={"/"} />) :
                            (<AddUser />)
                    } />
                    <Route path="/edit-admin/:unique_id" element={
                        !cookie || cookie === '[object Object]' ?
                            (<Navigate replace to={"/"} />) :
                            (<EditUser />)
                    } />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/products/category/:category" element={<Products />} />
                    <Route path="/cart" element={<Carts />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );

};