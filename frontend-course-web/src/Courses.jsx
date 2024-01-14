import React, { useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Courses = () => {
    const { userID } = useParams();

    useEffect(() => {
        const handle = async () => {
            try {
                const response = await Axios.get(`http://localhost:5000/addImage/post/${userID}`);
                console.log(response);
            } catch (error) {
                console.error('Error while fetching data:', error);
            }
        };

        // Call handle on component mount
        handle();
    }, [userID]);

    return (
        <div>Courses</div>
    );
};

export default Courses;
