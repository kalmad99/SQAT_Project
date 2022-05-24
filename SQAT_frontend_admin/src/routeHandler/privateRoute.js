import React from "react";
import { Route, Navigate } from "react-router-dom";
import { loggedin_user } from "./loggedindata";



const PrivateRoute = ({ location, children }) => {
    const auth_user = loggedin_user()


    // if the user is not logged in then the router navigate or redirect to login page


    if (!auth_user) {
        return <Navigate to="/auth/admin-login" state={{ from: location }} replace />;
    }

    return children;
}


export default PrivateRoute;
