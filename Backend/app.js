const express=require("express");
const mongoose=require("mongoose");
const router=require("./routes/form-routes");
const courseRouter=require("./routes/add-course-routes");
const Course = require("./model/Course");
const routerImage=require("./routes/addImage-routes")
const app=express();
const cors=require('cors');

app.use(cors());
app.use(express.json());
app.use('/',router);
app.use('/add',router);
app.use('/add-course',courseRouter);

app.post('/addImage/post/:userID', async (req, res) => {
  const { name } = req.body;
  const { userID } = req.params;

  console.log('Request Body:', req.body);

  try {
    const course = new Course({
      name,
      userID,
      inMyCourse:true 
    });

    await course.save();

    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.get('/addImage/post/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const courses = await Course.find({ userID });

    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.put('/addImage/post/:userID', async (req, res) => {
  const { userID } = req.params;
  const {name,inMyCourse}=req.body;
  console.log("checking...")
  console.log({name});

  try {
    // Find the course by userID and courseID
    const course = await Course.findOne({ name,userID });

    if (!course) {
      console.log("Inside app.js");
      return res.status(404).json({ error: 'Course not found' });
    }

    // Update the inMyCourse property
    course.inMyCourse = !inMyCourse;

    // Save the updated course to the database
    await course.save();

    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});




mongoose.connect(
  "mongodb+srv://sriyaivaturi:sriya1234@cluster0.5reps0y.mongodb.net/"  
  //"mongodb+srv://courseweb:LMErhaag1j3cMb0U@cluster0.qbe7oee.mongodb.net/"
   // "mongodb://localhost:27017/admin"
 ).then(()=>console.log("Connected to Database"))
  .then(()=>{app.listen(5000);}
  ).catch();

console.log("Hello!");