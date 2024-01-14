import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const AddImage = () => {
    const { userID } = useParams();
    const navigate = useNavigate();

    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(`http://localhost:5000/addImage/post/${userID}`);
                console.log("this is the response in get");
                console.log(response.data);
                setImageData(response.data.courses);
            } catch (error) {
                console.error('Error while fetching image data:', error);
            }
        };

        fetchData();
    }, [userID]);

    const handleSubmitSubmit = async (e) => {
        e.preventDefault();
        navigate(`/my-courses/${userID}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imageId = e.target.id;

        // Check if the name already exists in imageData
        if (imageData.some((image) => image.name === imageId)) {
            console.log(`Image with name '${imageId}' already exists`);
            return;
        }

        try {
            console.log(`imageId:${imageId}`)
            const response = await Axios.post(`http://localhost:5000/addImage/post/${userID}`, {
                name: imageId,
                userID: { userID },
                inMyCourse: false
            });

            console.log(response);
        } catch (error) {
            console.error('Error while sending form data:', error);
        }
    };

    return (
        <>
            {imageData.map((image) => (
                <button key={image.name} id={image.name} onClick={handleSubmit}>
                    {image.name}
                </button>
            ))}
            <button onClick={handleSubmitSubmit}>Submit</button>
        </>
    );
};

export default AddImage;
