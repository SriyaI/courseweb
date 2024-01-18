// AddImage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Card.css';
import './SubmitButton.css';
import CustomCheckbox from './CustomCheckbox';

const AddImage = () => {
  const { userID } = useParams();
  const navigate = useNavigate();

  const [imageData, setImageData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/addImage/post/${userID}`);
        setImageData(response.data.courses);
      } catch (error) {
        console.error('Error while fetching image data:', error);
      }
    };

    fetchData();
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/add-course`);
        setCourseData(response.data.forms);
      } catch (error) {
        console.error('Error while fetching image data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (imageName) => {
    setCheckedItems(prevState => {
      const isChecked = !prevState.includes(imageName);

      if (isChecked) {
        return [...prevState, imageName];
      } else {
        return prevState.filter(item => item !== imageName);
      }
    });
  };

  const handleSubmitSubmit = async (e) => {
    e.preventDefault();
  
    // Filter the imageData based on the checked items
    const selectedImages = imageData.filter((image) => checkedItems.includes(image.name));
  
    for (const selectedImage of selectedImages) {

      const { name } = selectedImage;
  
      const existingImage = imageData.find((image) => image.name === name && image.userID === userID);
  
      if (existingImage) {
        console.log(`Image with name '${name}' already exists`);
  
        try {
          await Axios.put(`http://localhost:5000/addImage/post/${userID}`, { name });
        } catch (error) {
          console.error('Error while updating inMyCourse:', error);
        }
  
        const { text, image } = getCourseDataForImage(courseData, name);

      } 

      
    }

    const selectedCourses = courseData.filter((course) => 
                              !imageData.some((image) => image.name === course.courseName) && checkedItems.includes(course.courseName)
                            );

        console.log("selected courses");
        console.log(selectedCourses);
     
        for (const selectedCourse of selectedCourses) {
        try {
          const response = await Axios.post(`http://localhost:5000/addImage/post/${userID}`, {
            name: selectedCourse.courseName,
            userID: userID,
            inMyCourse: true
          });

          console.log('Data posted successfully:', response.data);
        } catch (error) {
          console.error('Error while posting data:', error);
        }
        }
      
  
    navigate(`/my-courses/${userID}`);
  
    // Print all checked items
    console.log('Checked Items:', checkedItems);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageId = e.target.id;

    handleCheckboxChange(imageId);
  /*
    const existingCourse = courseData.find((course) => course.courseName === imageId);
    const existingImage = imageData.find((image) => image.name === imageId && image.userID === userID);

    if (existingCourse && existingImage) {
      console.log(`Image with name '${imageId}' and URL '${getCourseDataForImage(courseData, imageId).image}' exists in both courseData and imageData`);
    } else {
      console.log("nope");
      console.log(imageData);
      const nameExists = imageData.find((image) => image.name === imageId);
      if (!nameExists) {
        console.log(`not name exists ${nameExists}`);
        try {
          const response = await Axios.post(`http://localhost:5000/addImage/post/${userID}`, {
            name: imageId,
            userID: userID,
            inMyCourse: true
          });

          console.log('Data posted successfully:', response.data);
        } catch (error) {
          console.error('Error while posting data:', error);
        }
      } else {
        console.log("there are already exists");
      }
    }

    if (existingImage) {
      console.log(`Image with name '${imageId}' already exists`);

      try {
        await Axios.put(`http://localhost:5000/addImage/post/${userID}`, { name: imageId });
      } catch (error) {
        console.error('Error while updating inMyCourse:', error);
      }

      const { text, image } = getCourseDataForImage(courseData, imageId);

      console.log('Text:', text);
      console.log('Image:', image);

      return;
    }*/
  };

  const getCourseDataForImage = (courseData, imageName) => {
    const matchingCourse = courseData.find(course => course.courseName === imageName);

    if (matchingCourse) {
      const { text, image } = matchingCourse;
      return { text, image };
    }

    return { text: '', image: '' };
  };

  const isImageChecked = (imageName) => {
    return checkedItems.includes(imageName);
  };

  return (
    <>
      <div className="grid">
        {imageData.map((image1) => !image1.inMyCourse && (
          <div className="grid__item" key={image1.name}>
            <div className="card">
              <img
                className="card__img"
                src={getCourseDataForImage(courseData, image1.name).image || "https://placeholder.com/150"}
                alt="Image Placeholder"
              />
              <div className="card__content">
                <h1 className="card__header">{getCourseDataForImage(courseData, image1.name).text}</h1>
                <p className="card__text">{/* You can add a description if needed */}</p>
                <div className="card__btn-wrapper">
                  <CustomCheckbox isChecked={isImageChecked(image1.name)} toggleCheckbox={() => handleCheckboxChange(image1.name)} />
                  <button id={image1.name} className="card__btn" onClick={handleSubmit}>
                    {image1.name} <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {courseData
          .filter((course) => !imageData.some((image) => image.name === course.courseName))
          .map((course) => (
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
                  <div className="card__btn-wrapper">
                    <CustomCheckbox isChecked={isImageChecked(course.courseName)} toggleCheckbox={() => handleCheckboxChange(course.courseName)} />
                    <button id={course.courseName} className="card__btn" onClick={handleSubmit}>
                      {course.courseName} <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button className="button-6" role="button" onClick={handleSubmitSubmit}>
        Submit
      </button>
    </>
  );
};

export default AddImage;
