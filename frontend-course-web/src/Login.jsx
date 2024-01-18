import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './LogIn.css';

const Submit = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

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

    try {
        const response = await Axios.get(`http://localhost:5000/add`);
        const arr = response.data.forms;
        const filteredForms = response.data.forms.filter(form => form.password === formData.password);
        console.log("this is array");
        console.log(filteredForms);
    
        // Check if formData.userName is present in any form
        const isUserNamePresent = arr.some(form => form.userName === formData.userName && form.password === formData.password);
    
        if (isUserNamePresent) {
          // Username is present in one of the forms
          console.log('Username and password is present in one of the forms');
          navigate(`/loggedin?id=${filteredForms[0]._id}`)
        } else {
          // Username is not present in any form
          console.log('Username and password is not present in any form');
          alert('Incorrect');
        }
    
        // Continue with the rest of your logic...
    
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
  };
  

  return (
    <div className="login-div">

        <head> 
            <title>CourseWeb Registration</title> 
            <link rel="stylesheet" 
                href="style.css" /> 
        </head> 
        <body>
            <div className="main">
                <h1>GeeksforGeeks</h1> 
                <h3>Enter your login credentials</h3> 
                <form onSubmit={handleSubmit}>
                <label for="first">
                    Username:    
                </label>
                <input id="first" type="text" name="userName" value={formData.userName} onChange={handleChange} />
                <br />
                <label for="second">
                    Password:
                    
                </label>
                <input id="second" type="password" name="password" value={formData.password} onChange={handleChange} />
                <br />
                <div class="wrap"> 
                    <button type="submit"
                            onClick={handleSubmit}> 
                        Login 
                    </button> 
                </div> 
                </form>
                <p>
                    Not registered?  
                    <a href="#" style={{ textDecoration: 'none' }}>
                        Create an account 
                    </a> 
                </p>

            </div>
        </body>
    </div>
  );
};

export default Submit;
