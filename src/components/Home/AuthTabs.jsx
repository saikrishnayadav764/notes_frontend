import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './authTabs.css'; 

function AuthTabs({setShowAuthTabs}) {
    const [activeTab, setActiveTab] = useState('login');
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(true); // State to control modal visibility
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleTabChange = (tab) => {
        setUsername("")
        setEmail("")
        setPassword("")
        setErrorMessage("")
        setIsLoading(false)
        setActiveTab(tab);
    };

    const closeModal = () => {
        setUsername("")
        setEmail("")
        setPassword("")
        setErrorMessage("")
        setIsLoading(false)
        setShowAuthTabs(false)
        setShowModal(false); // Closing the modal
    };

    if (!showModal) return null; // Not rendering anything if modal is closed

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        // Set loading to true when the request starts
        setIsLoading(true);
        setErrorMessage(''); // Clearing any previous errors
        setSuccessMessage(''); // Clearing any previous success messages

        try {
            // Sending POST request using fetch API
            const response = await fetch('https://oscowbackend-production.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            // If login is successful and there's a token, storing it in cookies
            if (response.ok && data.token) {
                Cookies.set('token', data.token, { expires: 7 }); // Storing token for 7 days
                setSuccessMessage('Login successful!');
                navigate('/')
                setErrorMessage(''); // Clearing any error messages

                // Clearing form fields after successful login
                setEmail('');
                setPassword('');
            } else {
                // Handling error response if not successful
                setErrorMessage(data.message || 'Login failed');
                setSuccessMessage(''); // Clearing any success messages
            }
        } catch (error) {
            // Handle network or other errors
            setErrorMessage('An error occurred, please try again later.');
            setSuccessMessage(''); // Clearing any success messages
        } finally {
            // Setting loading to false when the request is done
            setIsLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        // Setting loading to true when the request starts
        setIsLoading(true);
        setErrorMessage(''); // Clearing any previous errors
        setSuccessMessage(''); // Clearing any previous success messages

        try {
            // Sending POST request using fetch API
            const response = await fetch('https://oscowbackend-production.up.railway.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            // If registration is successful and there's a token, storing it in cookies
            if (response.ok && data.token) {
                Cookies.set('token', data.token, { expires: 7 }); // Storing token for 7 days
                setSuccessMessage('Registration successful!');
                setErrorMessage(''); // Clearing any error messages

                // Clearing form fields after successful registration
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                // Handling error response if not successful
                setErrorMessage(data.message || 'Registration failed');
                setSuccessMessage(''); // Clearing any success messages
            }
        } catch (error) {
            // Handling network or other errors
            setErrorMessage('An error occurred, please try again later.');
            setSuccessMessage(''); // Clearing any success messages
        } finally {
            // Setting loading to false when the request is done
            setIsLoading(false);
        }
    };


    return (
        <div className="bx-background">
            <div className="bx-container">
                <button onClick={closeModal} className="close-bar">
                    ×
                </button>
                <div className="tabs">
                    <button
                        onClick={() => handleTabChange('login')}
                        className={activeTab === 'login' ? 'active' : ''}>
                        Login
                    </button>
                    <button
                        onClick={() => handleTabChange('register')}
                        className={activeTab === 'register' ? 'active' : ''}>
                        Register
                    </button>
                </div>

                {activeTab === 'login' ? (
                    <div className="bx-form">
                        <h2>Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="bx-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div className="bx-input">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            {successMessage && <div className="success-message">{successMessage}</div>}
                            {isLoading ? (
            <div className="loading-message">Logging in...</div>
          ) : (
            <button type="submit">Login</button>
          )}
                        </form>
                    </div>
                ) : (
                    <div className="bx-form">
                        <h2>Register</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="bx-input">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                            <div className="bx-input">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div className="bx-input">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    required
                                />
                            </div>

                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                            {successMessage && <div className="success-message">{successMessage}</div>}

                            {isLoading ? (
                                <div className="loading-message">Registering...</div>
                            ) : (
                                <button type="submit">Register</button>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthTabs;
