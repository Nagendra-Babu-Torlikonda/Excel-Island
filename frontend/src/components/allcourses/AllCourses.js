import React, { useState } from 'react';
import './allcourses.css';
import C1 from '../../images/course2.png';
import C2 from '../../images/course1.jpg';
import C3 from '../../images/course3.jpg';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import $ from 'jquery';

const AllCourses = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.value);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourseData = async () => {
            try{
                const response = await axios.get("/courses/cardview");
                if(response.status === 200){
                    setCourses(response.data);
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchCourseData();
    },[]);

    const addToCart = async (id) => {
        try{
            const data = {"userId" : user.userId, "courseId" : id};
            const response = await axios.post("/student/addToCart", data);
            if(response.status){
                alert("Added to cart");
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleSearch = () => {
        const value = $('#searchCourse').val().toLowerCase();
        $('.course-item').each(function () {
            const title = $(this).find('.course-title').text().toLowerCase();
            const price = $(this).find('.course-price').text().toLowerCase();
            const duration = $(this).find('.course-duration').text().toLowerCase();
            if (title.indexOf(value) > -1 || price.indexOf(value) > -1 || duration.indexOf(value) > -1 ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    };


  return (
    <div className='allcourses container my-0 h-100'>
        <section className="hero-section text-dark py-5 mb-4">
            <div className="container">
                <h4 className="display-4 text-center mb-5 animate__animated animate__fadeIn">Popular Course</h4>
                <div className="row align-items-center justify-content-start">
                    <div className="col-md-6 col-sm-12 col-xs-10 animate__animated animate__fadeInUp">
                        <div className="course-details  text-dark p-4 rounded ">
                                <h2 className="mb-3 fs-3 fw-bold">Course Title</h2>
                                <h4 className="fw-bold fs-3 mb-2"> <LocalOfferIcon className='me-2' />Rs.999</h4>
                            <h6 className="mb-3"><PersonIcon className='me-2' /> Instructor Name</h6>
                            <p className="mb-3"><AccessTimeIcon className='me-2' /> 10 hours</p>
                            <p className="mb-3"><LocationOnIcon className='me-2' /> Online</p>
                            <div className="d-flex justify-content-start">
                                <button className="btn btn-dark px-3 m-2 w-auto shadow-sm">
                                    <AddShoppingCartOutlinedIcon /> Add to Cart
                                </button>
                                <button className="btn btn-dark px-3 m-2 w-auto shadow-sm">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <h1 className='display-4 text-center mb-2'>Our Courses</h1>
        <div className="d-flex align-items-center justify-content-center w-100 mb-4">
            <input type="search" placeholder="Search course" id='searchCourse' onKeyUp={handleSearch} className="form-control w-50 me-3 border-bottom border-dark" />
            {/* <div className="btn-group my-4 ml-auto me-4" role="group" aria-label="Basic example">
                <div className="dropdown me-3">
                    <button className="btn btn-secondary w-auto dropdown-toggle" type="button" id="modeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        Mode
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="modeDropdown">
                        <li><a className="dropdown-item" href="#">Offline</a></li>
                        <li><a className="dropdown-item" href="#">Online</a></li>
                    </ul>
                </div>
                <div className="dropdown me-3">
                    <button className="btn btn-secondary dropdown-toggle w-auto" type="button" id="locationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        Location
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="locationDropdown">
                        <li><a className="dropdown-item" href="#">Hyderabad</a></li>
                        <li><a className="dropdown-item" href="#">Bangalore</a></li>
                        <li><a className="dropdown-item" href="#">Pune</a></li>
                        <li><a className="dropdown-item" href="#">Chennai</a></li>
                    </ul>
                </div>
                <div className="dropdown me-3">
                    <button className="btn btn-secondary dropdown-toggle w-auto" type="button" id="durationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        Duration
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="durationDropdown">
                        <li><a className="dropdown-item" href="#">2 months</a></li>
                        <li><a className="dropdown-item" href="#">3 months</a></li>
                        <li><a className="dropdown-item" href="#">5 months</a></li>
                        <li><a className="dropdown-item" href="#">6 months</a></li>
                    </ul>
                </div>
            </div> */}
        </div>
        <div className='row d-flex mx-4 g-4'>
            {courses.map((course) => (
                <div className='col-lg-3 col-md-6 col-sm-12 col-xs-10 course-item'>
                <div className="card mb-4">
                <img src={`/uploads/images/${course.image}`} alt='Course Image' className='img-fluid' />
                    <div className="card-body">
                            <h5 className="card-title two-line-heading course-title">{course.title}</h5>
                            <p className="card-text fw-bold fs-5 mb-2 course-price">Rs.{course.price}</p>
                        <h6 className="card-subtitle mb-2"><PersonIcon className='me-2' />{course.instructorName}</h6>
                        <p className="card-text mb-2 course-duration"><AccessTimeIcon className='me-2' />{course.duration}</p>
                        <p className="card-text"><LocationOnIcon className='me-2' /> online</p>
                        <div className="d-flex justify-content-between align-items-center">
                            {user.userRole === 'ROLE_STUDENT' && (<button className='btn btn-dark w-auto' onClick={() => addToCart(course.courseId)}><AddShoppingCartOutlinedIcon /></button>)}
                            
                            <button className='btn btn-dark w-auto' onClick = {() => navigate(`/viewcourse/${course.courseId}`)}>View</button>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default AllCourses