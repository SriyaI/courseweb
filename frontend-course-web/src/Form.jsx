import React, { useState, useEffect } from 'react';
import './Form.css';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  useEffect(() => {
    // Initialize form data state with empty values
    setFormData({
      userName: '',
      password: '',
    });
  }, []);

  const handleChange = (e) => {
    // Update the corresponding field in the form data state
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    axios.post("https://localhost:5000/add", {
      userName: formData.userName,
      password: formData.password
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label htmlFor="email"><b>Email</b></label>
        <input
          type="text"
          placeholder="Enter Email"
          name="userName"
          id="email"
          value={formData.userName}
          onChange={handleChange}
          required
        />

        <label htmlFor="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          id="psw"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="registerbtn">Register</button>
        
      </div>
    </form>
  );
}

export default Form;
