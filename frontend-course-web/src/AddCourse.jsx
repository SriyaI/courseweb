import React, { useState, useEffect } from 'react';
import './Form.css';
import axios from 'axios';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    image: '',
    header:'',
    text:''
  });

  useEffect(() => {
    // Initialize form data state with empty values
    setFormData({
        courseName: '',
        image: '',
        header:'',
        text:''
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

    axios.post("http://localhost:5000/add-course", {
        courseName: formData.courseName,
        image: formData.image,
        header:formData.header,
        text:formData.text
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h1>Register a course!</h1>
        <p>Please fill in this form to create a course.</p>
        <hr />

        <label><b>Course name</b></label>
        <input
          type="text"
          placeholder="Enter Course name"
          name="courseName"
          id="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
        />

        <label><b>Image URL</b></label>
        <input
          type="text"
          placeholder="Enter Image URL"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <label><b>Header</b></label>
        <input
          type="text"
          placeholder="Enter Header"
          name="header"
          id="header"
          value={formData.header}
          onChange={handleChange}
          required
        />

        <label><b>Text</b></label>
        <input
          type="text"
          placeholder="Enter text"
          name="text"
          id="text"
          value={formData.text}
          onChange={handleChange}
          required
        />

        <button type="submit" className="registerbtn" onClick={handleSubmit}>Register</button>
        
      </div>
    </form>
  );
}

export default AddCourse;
