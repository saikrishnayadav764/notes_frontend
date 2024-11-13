import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './login.css'; // Ensure your CSS is correctly imported
import { useNavigate } from 'react-router-dom';

function Login({ setIsLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading to true when the request starts
    setIsLoading(true);
    setErrorMessage(''); // Clear any previous errors
    setSuccessMessage(''); // Clear any previous success messages

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

      // If login is successful and there's a token, store it in cookies
      if (response.ok && data.token) {
        Cookies.set('token', data.token, { expires: 7 }); // Store token for 7 days
        setSuccessMessage('Login successful!');
        navigate('/')
        setErrorMessage(''); // Clear any error messages

        // Clear form fields after successful login
        setEmail('');
        setPassword('');
      } else {
        // Handle error response if not successful
        setErrorMessage(data.message || 'Login failed');
        setSuccessMessage(''); // Clear any success messages
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage('An error occurred, please try again later.');
      setSuccessMessage(''); // Clear any success messages
    } finally {
      // Set loading to false when the request is done
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsLogin(false); // Close the login form when close button is clicked
  };

  return (
    <div className="bx-background" onClick={handleClose}>
      <div className="bx-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Bar */}
        <div className="close-bar" onClick={handleClose}>
          &times;
        </div>
        <form className="bx-form" onSubmit={handleSubmit}>
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

          {/* Show loading indicator */}
          {isLoading ? (
            <div className="loading-message">Logging in...</div>
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
