const CourseData=require("../model/CourseData")

const postCourse = async (req, res, next) => {
    const { courseName, image, header, text } = req.body;

    // Validate required fields
    if (!courseName || !image || !header || !text) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const course = new CourseData({
            courseName,
            image,
            header,
            text
        });

        await course.save();
        return res.status(201).json({ course });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = postCourse;
