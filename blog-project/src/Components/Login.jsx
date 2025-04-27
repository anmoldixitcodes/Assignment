import React, { useState } from 'react';
import '../CSS/login.css';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:3001/Login', formData)
        .then(res => {
            if (res.data.message === "Success") {
            localStorage.setItem("userEmail", res.data.email); 
            alert('Login successful'); 
            navigate('/Home'); 
            } else {
                alert(res.data.message || "Something went wrong.");
            

            }
        })
        .catch(err => {
            console.error(err);
            alert('Something went wrong. Please try again.');
  });

  };

  return (
    <div className="auth-container">
        <h2 className="auth-title">Login To Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        
        <button type="submit" className="auth-btn">Login</button>
        <p className="auth-footer">
          Don't have an account? <Link to="/Register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
