import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Submit.css';

const Submit = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form Data successfully sent to the server');
        navigate('/submitted');
      } else {
        console.error('Failed to send form data to the server');
      }
    } catch (error) {
      console.error('Error while sending form data:', error);
    }
  };

  return (
    <div className="login-div">
      <head>
        <title>GeeksforGeeks Registration</title>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <div className="main">
          <h1>CourseWeb</h1>
          <h3>Enter your signup credentials</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="first">Username:</label>
            <input
              id="first"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="second">Password:</label>
            <input
              id="second"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <br />
            {passwordMatchError && (
              <p style={{ color: 'red' }}>Passwords do not match</p>
            )}
            <div className="wrap">
              <button type="submit" onClick={handleSubmit}>
                Signup
              </button>
            </div>
          </form>
          <p>
            Already registered?{' '}
            <a href="#" style={{ textDecoration: 'none' }}>
              Login
            </a>
          </p>
        </div>
      </body>
    </div>
  );
};

export default Submit;
