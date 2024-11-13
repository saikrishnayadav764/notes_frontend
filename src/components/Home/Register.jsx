import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './register.css'; // Ensure your CSS is correctly imported
import { useNavigate } from 'react-router-dom';

function Register({ setIsRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage(''); 
    setSuccessMessage(''); 

    try {
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


      if (response.ok && data.token) {
        Cookies.set('token', data.token, { expires: 7 });
        navigate('/')
        setSuccessMessage('Registration successful!');
        setErrorMessage(''); 

    
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'Registration failed');
        setSuccessMessage(''); 
      }
    } catch (error) {
      setErrorMessage('An error occurred, please try again later.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsRegister(false); 
  };

  return (
    <div className="bx-background" onClick={handleClose}>
      <div className="bx-container" onClick={(e) => e.stopPropagation()}>
        <div className="close-bar" onClick={handleClose}>
          &times;
        </div>
        <form className="bx-form" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Register;
