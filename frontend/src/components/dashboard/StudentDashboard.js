import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './studentdashboard.css';
import 'react-calendar/dist/Calendar.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { DeleteOutlineRounded, ArrowForwardRounded } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [viewCart, setViewCart] = useState(false);
    const [cartCourses, setCartCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try{
                const response = await axios.get(`/student/getAllEnrolledCourses/${user.userId}`);
                if(response.status === 200){
                    setEnrolledCourses(response.data);
                }
            }catch(error){
                console.log("error");
            }
        }

        const fetchCompletedCourses = async () => {
            try{
                const response = await axios.get(`/student/getAllCompletedCourses/${user.userId}`);
                if(response.status === 200){
                    setCompletedCourses(response.data);
                    console.log(response.data);
                }
            }catch(error){
                console.log("error");
            }
        }

        const fetchCartCourses = async () => {
            try{
                const response = await axios.get(`/student/getCartCourses/${user.userId}`);
                if(response.status === 200){
                    setCartCourses(response.data);
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchEnrolledCourses();
        fetchCartCourses();
        fetchCompletedCourses();
    },[]);

    const openEnrolledCourse = (viewId) => {
        navigate(`/viewEnrolledCourse/${viewId}`);
    }

    const deleteFromCart = (cId) => {
        console.log(cId);
        const payload = {"userId" : user.userId, "courseId" : cId};
        console.log(payload);
        try{
            const response = axios.delete("/student/deleteFromCart", { data: payload});
            if(response.status === 200){
                alert("deleted successfully");
                setCartCourses(response.data);
                setViewCart(false);
            }
        }catch(error){
            console.log(error);
        }
    }


  return (
    <div className='my-container m-0'>
        <div className='row d-flex justify-content-between bg-dark text-white m-0 p-3'>
            <div className='col-md-8'>
                    <h3>{user.userName}</h3>
                    <p>{user.userEmail}</p>
            </div>
            <div className='col-md-3 d-flex align-items-center justify-content-end'>
                <div className="position-relative d-inline-block mx-2">
                    <ShoppingCartOutlinedIcon className="fs-3" style={{cursor : "pointer"}} onClick ={() => setViewCart(true)}/>
                    <span className="badge badge-danger position-absolute top-0 start-100 translate-middle">
                        {cartCourses.length}
                    </span>
                </div>
                <div className="position-relative d-inline-block mx-2">
                    <NotificationsNoneIcon className="fs-3" style={{cursor : "pointer"}}/>
                    <span className="badge badge-danger position-absolute top-0 start-100 translate-middle">
                        2
                    </span>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col g-3 m-3'>
                <div className='my-list'>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="mylearning-tab" data-bs-toggle="tab" data-bs-target="#mylearning" type="button" role="tab" aria-controls="mylearning" aria-selected="true">My Learning</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="completed-tab" data-bs-toggle="tab" data-bs-target="#completed" type="button" role="tab" aria-controls="completed" aria-selected="false">Completed</button>
                        </li>
                        {/* <li class="nav-item" role="presentation">
                            <button class="nav-link" id="mycertifications-tab" data-bs-toggle="tab" data-bs-target="#mycertifications" type="button" role="tab" aria-controls="mycertifications" aria-selected="false">My Certifications</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="announcements-tab" data-bs-toggle="tab" data-bs-target="#announcements" type="button" role="tab" aria-controls="announcements" aria-selected="false">Announcements</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="discussionform-tab" data-bs-toggle="tab" data-bs-target="#discussionform" type="button" role="tab" aria-controls="discussionform" aria-selected="false">Discussion Form</button>
                        </li> */}
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="mylearning" role="tabpanel" aria-labelledby="mylearning-tab">
                            <div className='row d-flex m-4 g-4'>
                                {enrolledCourses.map((course) => (
                                    <div className='col-lg-3 col-md-5 col-10' onClick={() => openEnrolledCourse(course.courseId)}>
                                        <div className="card mb-4">
                                        <img src={`/uploads/images/${course.image}`} className='img-fluid' />
                                            <div className="card-body">
                                                <h4 className="card-title text-center two-line-heading">{course.title}</h4>
                                                <h6 className="card-subtitle mb-2 text-muted">Instructor: {course.instructorName}</h6>
                                                <p className="card-text">Duration:{course.duration}</p>
                                                <p className="card-text">Mode: mode</p>
                                                <div class="progress">
                                                    <div class="progress-bar bg-dark" role="progressbar" style={{"width": "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                        </div>
                        <div class="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="completed-tab">
                        <div className='row d-flex m-4 g-4'>
                                {completedCourses.map((course) => (
                                    <div className='col-lg-3 col-md-5 col-10'>
                                        <div className="card mb-4">
                                        <img src={`/uploads/images/${course.image}`} className='img-fluid' />
                                            <div className="card-body">
                                                <h4 className="card-title text-center two-line-heading">{course.title}</h4>
                                                <h6 className="card-subtitle mb-2 text-muted">Instructor: {course.instructorName}</h6>
                                                <p className="card-text">Duration:{course.duration}</p>
                                                <p className="card-text">Mode: mode</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                        </div>
                        <div class="tab-pane fade" id="mycertifications" role="tabpanel" aria-labelledby="mycertifications-tab">
                            <div className='row m-3'>
                                <div className='col flex-column p-5 d-flex justify-content-between align-items-center  m-3  certificate-view'>
                                    <h6>Title of the course</h6>
                                    <button className='btn btn-primary m-2'>View</button>
                                </div>
                                <div className='col flex-column p-5 d-flex justify-content-between align-items-center m-3  certificate-view'>
                                    <h6>Title of the course</h6>
                                    <button className='btn btn-primary m-2'>View</button>
                                </div>
                                <div className='col flex-column p-5 d-flex justify-content-between align-items-center m-3  certificate-view'>
                                    <h6>Title of the course</h6>
                                    <button className='btn btn-primary m-2'>View</button>
                                </div>
                                <div className='col flex-column p-5 d-flex justify-content-between align-items-center m-3  certificate-view'>
                                    <h6>Title of the course</h6>
                                    <button className='btn btn-primary m-2'>View</button>
                                </div>
                                <div className='col flex-column p-5 d-flex justify-content-between align-items-center m-3  certificate-view'>
                                    <h6>Title of the course</h6>
                                    <button className='btn btn-primary m-2'>View</button>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade " id="announcements" role="tabpanel" aria-labelledby="announcements-tab">
                            announcements
                        </div>
                        <div class="tab-pane fade " id="discussionform" role="tabpanel" aria-labelledby="discussionform-tab">
                            discussionform
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='col-lg-3 col-sm-12 m-3'>
                <div className="calendar-container">
                    <h3>Calendar</h3>
                    <div className="row">
                        <div className="col-lg-12 col-md-6 col-sm-6 border-none">
                            <Calendar onChange={handleDateChange} value={date} style={{ border: 'none' }} />
                        </div>
                        <div className="col-lg-12 col-md-6 col-sm-6 m-4 events">
                            <h4>Events</h4>
                            <p>No events for this date.</p>
                        </div>
                    </div>
                </div>
            </div> */}
            {viewCart && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Cart</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setViewCart(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className='container'>
                {cartCourses && (
                    cartCourses.map((c) => (
                        <div className="row m-4 d-flex justify-content-between align-items-center cart-row">
                            <div className='col-6 p-2 d-flex justify-content-between align-items-center'>
                                <h6 className='w-auto mb-0 '>{c.title}</h6>
                                <div className='col-2 p-2'><p className='w-auto mb-0'>Rs.{c.price}/-</p></div>
                            </div>
                            <div className='col-4 p-2 d-flex justify-content-center'>   
                                <div className='col-3 p-2'><DeleteOutlineRounded className='text-danger' style={{cursor : "pointer"}} onClick = {() => deleteFromCart(c.courseId)} /></div>
                                <div className='col-3 p-2'><ArrowForwardRounded className='text-dark' style={{cursor : "pointer"}} onClick = {() => navigate(`/viewcourse/${c.courseId}`)}/></div>
                            </div>
                            
                        </div>
                    ))
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {viewCart && <div className="modal-backdrop fade show"></div>}
        </div>
    </div>
  )
}

export default StudentDashboard;