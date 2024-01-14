import React from 'react'
import { useParams } from 'react-router-dom';
import {useNavigate,useLocation } from 'react-router-dom';
import Axios from 'axios';

const LoggedIn = () => {

    const { search } = useLocation();
    const navigate = useNavigate();

    // Parse the query string to get the id parameter
    const params = new URLSearchParams(search);
    const id = params.get('id');

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await Axios.get(`http://localhost:5000/addImage/post/${id}`);
          
          console.log(response);
          navigate(`addImage/${id}`)

        } catch (error) {
          console.error('Error while fetching data:', error);
        }
    };

  return (
    <>
    <h1>You have succesfully LoggedIn!</h1>
    <button onClick={handleSubmit}>Proceed to courses</button>
    </>
  )
}

export default LoggedIn;


