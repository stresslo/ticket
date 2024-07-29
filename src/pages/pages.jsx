import "./pages.css"
import { useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';

import Event from '../components/content/event';
import Review from '../components/content/review';
import Ticket from "../components/content/ticket";
import Loader from "../../utils/loader";
import Context from "../../utils/context";
import HandleUser from "../../service/handleUser";
import HandleCookie from "../../service/handleCookie";
import HandleMaintenance from "../../service/handleMaintenance";
import MobileSidebar from "../components/sidebar/mobileSidebar";
import HandleGoogle from "../../service/handleGoogle";

const Pages = () => {

    const navigate = useNavigate();
    const context = useContext(Context);
    const path = location.pathname;

    if (context.loading) {
        return (
            <div className="page">
                <Sidebar/>
                <MobileSidebar/>
                <div className="content-right">
                    <Navbar/>
                    <Loader/>
                </div>
            </div>
        )
    }

    if (!context.ready) {
        return (
            <div className="page">
                <Sidebar/>
                <MobileSidebar/>
                <div className="content-right">
                    <Navbar/>
                    <HandleMaintenance/>
                </div>
            </div>
        )
    }

    if (!context.cookie) {
        return (
            <div className="page">
                <Sidebar/>
                <MobileSidebar/>
                <div className="content-right">
                    <Navbar/>
                    <HandleCookie/>
                </div>
            </div>
        )
    }

    return (
        <>
        {(context.token) ? 
        <div className="page">
            <Sidebar/>
            <MobileSidebar/>
            <div className="content-right">
                <Navbar/>
                {(path == '/review') && <Review/>}
                {(path == '/events' || path == '/') && <Event/>}
                {(path == '/tickets') && <Ticket/>}
            </div>
        </div>
        : 
        <div className="page">
            <Sidebar/>
            <MobileSidebar/>
            <div className="content-right">
                <Navbar/>
                {(path == '/api/ticket/v1/auth/google/callback') ? <HandleGoogle/> : <HandleUser/> }
            </div>
        </div>
        }
        </>
    )
}

export default Pages;