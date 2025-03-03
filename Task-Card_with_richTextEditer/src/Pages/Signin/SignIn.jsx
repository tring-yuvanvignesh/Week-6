import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slicer/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../api/userApi";
import googleLogo from "../../Images/google_logo.png";
import "./signIn.css";

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ loginUser ] = useMutation(LOGIN_USER);

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
            const { data } = await loginUser({ 
                variables: { email: credentials.email, password: credentials.password } 
            });

            if (data?.loginUser) {
                const { token, user } = data.loginUser;
                localStorage.setItem("token", token); 
                dispatch(setUser(user));
                navigate("/landingPage");
            }
        } catch (err) {
            console.error("GraphQL Error:", err);
            alert(err.message );
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
