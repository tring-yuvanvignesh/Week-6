// import React from 'react';
// import './signUp.css';
// import googleLogo from '../../Images/google_logo.png';
// import { Link } from 'react-router-dom';

// const SignUp = () => {
//     return (
//         <div className="signup-wrapper">

//           <div className="content-container">
//               <div className="signup-container">
//                   <h2>Sign Up</h2>

//                   <label htmlFor="name">Full Name</label>
//                   <input type="text" id="name" placeholder="Enter your full name" />

//                   <label htmlFor="email">Email</label>
//                   <input type="email" id="email" placeholder="Enter your email" />

//                   <label htmlFor="password">Password</label>
//                   <input type="password" id="password" placeholder="Create a password" />

//                   <button className="register-btn">Register</button>

//                   <div className="signUp-divider">
//                       <hr /> <span>OR</span> <hr />
//                   </div>

//                   <button className="google-signup-btn">
//                       <img src={googleLogo} alt="Google Logo" /> Sign up with Google
//                   </button>

//                   <p className="signin-redirect">
//                       Already have an account? <Link to={'/signIn'}>Sign In</Link>
//                   </p>
//               </div>

//               <div className="signUp-right-section">
//                   <h2>Join Us!</h2>
//                   <p>Sign up to explore more.</p>
//               </div>
//           </div>
//         </div>
//     );
// };

// export default SignUp;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Slicer/authSlice";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from '../../Images/google_logo.png';
import validator from 'validator';
import "./signUp.css"

const SignUp = () => {
    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" })
    const [errorMessage, setErrorMessage] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [nameError, setNameError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector((state) => state.auth.users);


    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const validate = (e) => {
        const password = e.target.value
        if (validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage(null)
            setUserDetails({ ...userDetails, password })
        } else {
            setErrorMessage("Your Password is Week");
            setUserDetails({ ...userDetails, password: "" })
        }
    }

    const validateEmail = (e) => {

        const email = e.target.value;
        const emailExists = users.some(user => user.email === email);

        if (!validator.isEmail(email)) {
            setEmailError("Enter a valid Email!")
            setUserDetails({ ...userDetails, email: "" })
            return;
        }
    
        if (emailExists) {
            setEmailError("Email is already in use!")
            setUserDetails({ ...userDetails, email: "" })
            return;
        }
    
        setEmailError(null);
        setUserDetails({ ...userDetails, email })
    }

    const validateName = (e) => {
        const currName = e.target.value;

        if(currName.trim() === ""){
            setNameError("Please enter a valid name.")
            setUserDetails({ ...userDetails, name: "" })
            return
        }
        else{
            setNameError(null)
            setUserDetails({ ...userDetails, name: currName })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userDetails.name === "" || userDetails.email === "" || userDetails.password === "") {
            alert('Please enter the all details')
            return
        }

        dispatch(registerUser(userDetails))
        navigate("/signIn")
    }

    return (
        <div className="signup-wrapper">
            <div className="content-container">
                <div className="signup-container">
                    <h2>Sign Up</h2>

                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" placeholder="Enter your full name" onChange={validateName} required/>
                    {nameError && (
                        <span style={{ color: 'red' }}>{nameError}</span>
                    )}

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter your email" onChange={validateEmail} />
                    {emailError && (
                        <span style={{ color: 'red' }}>{emailError}</span>
                    )}

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Create a password" onChange={validate} />
                    {errorMessage && (
                        <span style={{ color: 'red', marginBottom: '4px' }}>{errorMessage}</span>
                    )}

                    <button className="register-btn" onClick={handleSubmit} disabled={!!(errorMessage || emailError || nameError)}>
                        Register
                    </button>

                    <div className="signUp-divider">
                        <hr /> <span>OR</span> <hr />
                    </div>

                    <button className="google-signup-btn">
                        <img src={googleLogo} alt="Google Logo" /> Sign up with Google
                    </button>

                    <p className="signin-redirect">
                        Already have an account? <Link to={'/signIn'}>Sign In</Link>
                    </p>
                </div>

                <div className="signUp-right-section">
                    <h1>Welcome</h1>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
