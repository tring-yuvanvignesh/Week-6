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


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slicer/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../api/userApi";
import googleLogo from "../../Images/google_logo.png";
import "./signIn.css";

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [getUser, { error }] = useLazyQuery(GET_USER);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const { data } = await getUser({ variables: { email: credentials.email } });

            if (data?.user) {
                const user = data.user;

                if (credentials.password === user.password) { 
                    dispatch(setUser(user));
                    navigate("/landingPage");
                } else {
                    alert("Invalid password.");
                }
            } else {
                alert("User not found.");
            }
        } catch (err) {
            console.error("GraphQL Error:", err);
            alert("An error occurred. Please try again.");
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
                    <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                    <br />

                    {error && <p style={{ color: "red" }}>GraphQL Error: {error.message}</p>}

                    <button className="submit-btn" onClick={handleSubmit}>Login</button>

                    <div className="divider">
                        <hr /> <span>OR</span> <hr />
                    </div>

                    <button className="google-btn">
                        <img src={googleLogo} alt="Google Logo" /> Sign in with Google
                    </button>

                    <p className="signIn-signup-container">
                        Don’t have an account? <Link to="/signUp">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
