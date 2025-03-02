import React from "react";
import "./landingnav.css";
import logo from '../../Images/logo.png'
import { logoutUser } from '../../Slicer/authSlice'
import { useDispatch } from 'react-redux'


const Landingnav = () => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }


  return (
    <div className="landingnavbar">
      <div className="navbar-left">
            <img src={logo} alt="logo"  />
      </div>
      <a onClick={handleLogout} style={{color: "white"}}>logout</a>
    </div>
  );
};

export default Landingnav;
