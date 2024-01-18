import './App.css';
import Form from './Form';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Submit from './Submit';
import React from 'react';
import Submitted from './Submitted';
import Login from './Login';
import LoggedIn from './LoggedIn';
import AddImage from './AddImage';
import Courses from './Courses';
import PostCourse from './PostCourse';
import Card from './Card';
import AddCourse from './AddCourse';
import RegisteredCourse from './RegisteredCourse';

function App() {
  return (
    <Router>
      <>
        <main>
            <nav>
              <div className="navbar">
                <div class="logo"><a href="#">CourseWeb</a></div>
                <ul class="menu">
                  <li><a href="/">Home</a></li>
                  <li><a href="/login">Log IN</a></li>
                  <li><a href="/register">Sign UP</a></li>
                  <li><a href="#Contact">Contact</a></li>
                  <li><a href="/add-course">Add Course</a></li>
                </ul>
              </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} exact />            
            <Route path="/register" element={<Submit />} exact />
            <Route path="/submitted" element={<Submitted />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/loggedin" element={<LoggedIn />} exact />
            <Route path="/loggedin/addImage/:userID" element={<AddImage />} exact />
            <Route path="/my-courses/:userID" element={<PostCourse />} exact />
            <Route path="/card" element={<Card />} exact />
            <Route path="/add-course" element={<AddCourse />} exact />
            <Route path="/added-course" element={<RegisteredCourse />} exact />
          </Routes>
        </main>
      </>
    </Router>
  );
}

export default App;
