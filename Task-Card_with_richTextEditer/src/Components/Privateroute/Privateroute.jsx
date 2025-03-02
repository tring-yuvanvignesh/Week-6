// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'

// const Privateroute = () => {

//     const user = useSelector((state) => state.userInfo.user)

//     if (!user) {
//         return <Navigate to={'/signIn'} />
//     }

//     return (
//         <Outlet />
//     )
// }

// export default Privateroute

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Privateroute = () => {
    const user = useSelector((state) => state.auth.currentUser);
        if (!user) {
        return <Navigate to={'/signIn'} />
    }

    return (
        <Outlet />
    )
};

export default Privateroute;
