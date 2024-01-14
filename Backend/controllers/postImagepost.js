// controllers/postImage.js
const express = require("express");
const Course = require("../model/Course");
const router = express.Router();

const postImagepost = async (req, res) => {
    console.log("this is in postimagepost");
    console.log(req.body);
    const  {name}  = req.body;
    const {userID}=req.params;

    console.log({userID});

    // Handle the logic for adding an image based on userId
    // For example, create a new Course with the userId
    try {
        const course = new Course({
            // Add properties based on your data model
            name,
            userID
            // Other properties...
        });

        // Save the course to the database
        await course.save();
        console.log("this is course");
        console.log({course});
        return res.status(201).json({ course });
    } catch (error) {
        console.error("Error adding image:", error);
        return res.status(500).json({ Error });
    }
};

module.exports = postImagepost;
