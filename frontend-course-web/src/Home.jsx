import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Card.css';
import './SubmitButton.css';

const Home = () => {
  const { userID } = useParams();
  const navigate = useNavigate();

  const [courseData,setCourseData]=useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/add-course`);
        console.log("response.data.forms this is");
        console.log(response.data.forms);
        setCourseData(response.data.forms);

      } catch (error) {
        console.error('Error while fetching image data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("this is course data");
    console.log(courseData);
  }, [courseData]);


  const getCourseDataForImage = (courseData, imageName) => {
    const matchingCourse = courseData.find(course => course.courseName === imageName);
  
    if (matchingCourse) {
      const { text, image } = matchingCourse;
      return { text, image };
    }
  
    return { text: '', image: '' }; // Return default values if no match is found
  };
  
/*
  // Inside your component function
const handleSubmit = async (e) => {
    e.preventDefault();
    const imageId = e.target.id;
  
    // Check if the name already exists in imageData
    

    const existingCourse = courseData.find(
        (course) => course.courseName === imageId
      );
    
      // Check if the name and URL already exist in imageData
    const existingImage = imageData.find((image) => image.name === imageId && image.userID === userID);
    
    if (existingCourse && existingImage) {
        console.log(`Image with name '${imageId}' and URL '${getCourseDataForImage(courseData, imageId).image}' exists in both courseData and imageData`);
    }

    else{
        console.log("nope");
        console.log(imageData);
        const nameExists = imageData.find((image) => image.name === imageId);
        if(!nameExists){
            console.log(`not name exists ${nameExists}`);
        try {
            const response = await Axios.post(`http://localhost:5000/addImage/post/${userID}`, {
              name: imageId,
              userID: userID,
              inMyCourse: true
            });
            
            console.log('Data posted successfully:', response.data);
            // You can add further logic based on the response if needed
          } catch (error) {
            console.error('Error while posting data:', error);
          }
        }else{
            console.log("there are already exists");
        }
    }
  
    if (existingImage) {
      console.log(`Image with name '${imageId}' already exists`);
  
      // Update inMyCourse property on the server and locally
      try {
        // Make a request to your server to update the inMyCourse property
        await Axios.put(`http://localhost:5000/addImage/post/${userID}`, { name: imageId });
      } catch (error) {
        console.error('Error while updating inMyCourse:', error);
      }
  
      // Get the courseData for the current image
      const { text, image } = getCourseDataForImage(courseData, imageId);
  
      // Now you have the 'text' and 'image' values for the current image
      console.log('Text:', text);
      console.log('Image:', image);
  
      return;
    }
  
    // If the image doesn't exist, you can proceed with your logic
  };
  */

  return (
    <>
      <div className="grid">

        {courseData
          .map((course) =>  (
          <div className="grid__item" key={course.courseName}>
            <div className="card">
              <img
                className="card__img"
                src={course.image || "https://placeholder.com/150"}
                alt="Image Placeholder"
              />
              <div className="card__content">
                <h1 className="card__header">{course.header}</h1>
                <p className="card__text">{/* You can add a description if needed */}</p>
                <button id={course.courseName} className="card__btn">
                  {course.courseName} <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  );
};

export default Home;
