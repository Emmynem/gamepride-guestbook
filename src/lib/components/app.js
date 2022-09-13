import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import React from "react";
import { config } from "../config";
import useCookie from "../hooks/useCookie";
import { Layout, Login, Home, Admins, Guests, AddAdmin, EditAdmin } from './index';

export default function App() {
    const [cookie] = useCookie(config.token, "");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/guest/signup" element={<Home />} />
                    <Route path="/backoffice/login" element={<Login />} />
                    <Route path="/admins" element={
                        !cookie || cookie === '[object Object]' ?
                        (<Navigate replace to={"/"} />) :
                        (<Admins />)
                    } />
                    <Route path="/guests" element={
                        !cookie || cookie === '[object Object]' ?
                        (<Navigate replace to={"/"} />) :
                        (<Guests />)
                    } />
                    <Route path="/admin/add" element={
                        !cookie || cookie === '[object Object]' ?
                        (<Navigate replace to={"/"} />) :
                        (<AddAdmin />)
                    } />
                    <Route path="/admin/edit/:unique_id" element={
                        !cookie || cookie === '[object Object]' ?
                        (<Navigate replace to={"/"} />) :
                        (<EditAdmin />)
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );

};