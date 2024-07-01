import React from "react";
import {Routes, Route, Navigate } from "react-router-dom";
const PrivateRoute = ({ element,isAdmin,...rest})=>{
    return (
         <Routes>
            <Route
            {...rest}
            element = {isAdmin ? element : <Navigate to="/login"/>}
        />
        </Routes>
    )
}
export default PrivateRoute;