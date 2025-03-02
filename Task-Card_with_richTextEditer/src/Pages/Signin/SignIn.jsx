// import React from 'react';
// import './SignIn.css';
// import logo from '../../Images/logo.png';
// import background from '../../Images/login_background.png';
// import googleLogo from '../../Images/google_logo.png';
// import { Link } from 'react-router-dom'

// const SignIn = () => {
//     return (
//         <div className="signin-wrapper">
//             <div className="overlay"></div>

//             <div className="content-wrapper">
//                 <div className="left-section">
//                     <h2>Welcome Back!</h2>
//                     <p>Sign in to continue your journey.</p>
//                 </div>

//                 <div className="signin-container">
//                     <h2>Sign In</h2>

//                     <label htmlFor="email">Email</label>
//                     <input type="email" id="email" placeholder="Enter your email" />

//                     <label htmlFor="password">Password</label>
//                     <input type="password" id="password" placeholder="Enter your password" />
//                     <br />

//                     {/* <div className="checkbox-container">
//                         <label><input type="checkbox" /> Remember me</label>
//                         <a href="#" className="forgot-password">Forgot Password?</a>
//                     </div> */}

//                     <button className="submit-btn">Login</button>

//                     <div className="divider">
//                         <hr /> <span>OR</span> <hr />
//                     </div>

//                     <button className="google-btn">
//                         <img src={googleLogo} alt="Google Logo" /> Sign in with Google
//                     </button>

//                     <p className="signIn-signup-container">
//                         Don’t have an account? <Link to={'/signUp'}><a href="./signUp.html">Sign Up</a></Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignIn;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../Slicer/authSlice"
import { Link, useNavigate } from "react-router-dom"
import googleLogo from '../../Images/google_logo.png'
import "./signIn.css"

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.auth.users);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch("http://localhost:3000/user/Raja123@gmail.com");

    //             if (!res.ok) { 
    //                 throw new Error(`HTTP error! Status: ${res.status}`);
    //             }

    //             const data = await res.json();
    //             console.log(data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error.message);
    //         }
    //     }
    // },[])

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const userExists = users.find(
            (user) => user.email === credentials.email && user.password === credentials.password
        )

        if (userExists) {
            dispatch(loginUser(credentials))
            navigate("/landingPage")
        } else {
            alert("Invalid email or password")
        }
    };

    return (
        <div className="signin-wrapper">

            <div className="content-wrapper">
                <div className="left-section">
                    <h2>Welcome Back!</h2>
                </div>

                <div className="signin-container">
                    <h2>Sign In</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={handleChange}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" onChange={handleChange}/>
                    <br />

                    {/* <div className="checkbox-container">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div> */}

                    <button className="submit-btn" onClick={handleSubmit}>Login</button>

                    <div className="divider">
                        <hr /> <span>OR</span> <hr />
                    </div>

                    <button className="google-btn">
                        <img src={googleLogo} alt="Google Logo" /> Sign in with Google
                    </button>

                    <p className="signIn-signup-container">
                        Don’t have an account? <Link to={'/signUp'}><a href="./signUp.html">Sign Up</a></Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
