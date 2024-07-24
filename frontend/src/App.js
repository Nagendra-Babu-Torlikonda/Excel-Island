import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/navbar/Sidebar';
import Home from './components/home/Home';
import AboutUs from './components/aboutus/AboutUs';
import Gallery from './components/gallery/Gallery';
import LoginPage from './components/loginpage/Login';
import AllCourses from './components/allcourses/AllCourses';
import ViewCourse from './components/viewcourse/ViewCourse';
import ViewInstructor from './components/viewinstructor/ViewInstructor';
import ViewEnrolledCourse from './components/viewcourse/ViewEnrolledCourse';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import InstructorDashboard from './components/dashboard/InstructorDashboard';
import Instructors from './components/instructors/Instructors';
import ViewBlog from './components/blogs/ViewBlog';
import ContactUs from './components/contactus/ContactUs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route exact path='/' element = {<Home />} />
            <Route path = '/aboutus' element = {<AboutUs />} />
            <Route path = '/gallery' element = {<Gallery />} />
            <Route path = '/loginpage' element = {<LoginPage />} />
            <Route path = '/allcourses' element = {<AllCourses />} />
            <Route path = '/viewcourse/:id' element = {<ViewCourse/>} />
            <Route path = '/viewEnrolledCourse/:id' element = {<ViewEnrolledCourse/>} />
            <Route path = '/studentdashboard' element = {<StudentDashboard />} />
            <Route path = '/instructordashboard' element = {<InstructorDashboard />} />
            <Route path = '/admindashboard' element = {<AdminDashboard />} />
            <Route path = '/instructors' element = {<Instructors />} />
            <Route path = '/viewinstructor/:id' element = {<ViewInstructor/>} />
            <Route path = '/viewBlog' element = {<ViewBlog />} />
            <Route path = '/contactus' element = {<ContactUs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
