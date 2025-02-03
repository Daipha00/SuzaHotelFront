import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Create this CSS file for custom styles
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/login', { email, userPassword });
    
            if (response.status === 200) {
                const user = response.data;

                // Check if the roleName is 'Client'
                const clientRole = user.role.find((r) => r.roleName === 'Client');
                if (clientRole) {
                    // Store user id as clientId
                    localStorage.setItem('clientId', user.id);
                }
                
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(user));

                // Navigate to the contents page after login
                navigate('/contents'); 
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid email or password!');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set user data
        }
    }, []);

    return (
        <div className="login-container">
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Login</title>

            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html">Login</a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your journey</p>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">Remember Me</label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2"> Sign in using Facebook</i>
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2"> Sign in using Google+</i>
                            </a>
                        </div>
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <a href="/register" className="text-center">Register a new membership</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
