import React from "react";
import '../Styles/style.css';
import {  Outlet } from 'react-router-dom';
import Sidebar from "../Component/Sidebar"; 



function Dashboard(){
    return (
        <>
        <Sidebar />
        <Outlet />
        
        </>
    )
}

export default Dashboard;