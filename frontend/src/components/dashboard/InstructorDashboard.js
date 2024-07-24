import React from 'react';
import { useState , useEffect} from 'react';
import './instructordashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import C1 from '../../images/course1.jpg';
import C2 from '../../images/course2.png';
import C3 from '../../images/course3.jpg';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { event } from 'jquery';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const axiosInstance = axios.create({
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
        // auth: {
        //     username: user.email,
        //     password: user.userPassword,
        // },
        referrerPolicy: 'no-referrer'
    });

    const initialState = {
        title: '',
        duration: '',
        contents: [{ text: '', video: null }],
        demoVideo: null,
        image: null,
        instructor : '',
    };

    const [courseData, setCourseData] = useState(initialState);
    const [isOffline, setIsOffline] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [instructorCourses, setInstructorCourses] = useState([]);
    const [instructorReviews, setInstructorReviews] = useState([]);

    const handleModeChange = (e) => {
        setIsOffline(e.target.value === 'offline');
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            // Handle file inputs separately
            setCourseData({ ...courseData, [name]: files[0] });
        } else {
            // Handle regular inputs
            setCourseData({ ...courseData, [name]: value });
        }
    };
    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axiosInstance.get(`/instructor/myCourses/${user.userId}`);
            if (response.status === 200) {
              setInstructorCourses(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchCourses();
      }, []);
      
      useEffect(() => {
        const fetchInstructorReviews = async () => {
          try {
            const response = await axiosInstance.get(`/instructor/myReviews/${user.userId}`);
            if (response.status === 200) {
              setInstructorReviews(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchInstructorReviews();
      }, [instructorCourses, instructorReviews]); 

    const handleContentChange = (index, field, value) => {
        const newContents = [...courseData.contents];
        newContents[index].text = value;
        setCourseData({ ...courseData, contents: newContents });
    };

    const handleVideoUpload = (index, file) => {
        const newContents = [...courseData.contents];
        newContents[index].video = file;
        setCourseData({ ...courseData, contents: newContents });
    };

    const addContentField = () => {
        setCourseData({
            ...courseData,
            contents: [...courseData.contents, { text: '', video: null }],
        });
    };

    const removeContentField = (index) => {
        const updatedContents = courseData.contents.filter((_, contentIndex) => contentIndex !== index);
        setCourseData({ ...courseData, contents: updatedContents });
    };

    const deleteCourse = async (id) => {
        try {
            const response = await axiosInstance.delete(`/instructor/deleteCourse/${id}`)
            if(response.status === 200){
                alert("Course Deleted Successfully");
                const updated = instructorCourses.filter((course) => course.id != id);
                setInstructorCourses(updated);
            }
        }catch(error){
            alert("unable to delete course");
        }
    }

    const updateCourse = async (course) => {
        try{
            console.log(course);
            console.log(courseData);
        }catch(error){
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCourseData = {...courseData, instructor : user.userId}
        setCourseData(updatedCourseData);
        const formData = new FormData();
            formData.append('title', updatedCourseData.title);
            formData.append('duration', updatedCourseData.duration);
            formData.append('price', updatedCourseData.price);
            formData.append('instructor', updatedCourseData.instructor);
            formData.append('demoVideo', updatedCourseData.demoVideo);
            formData.append('image', updatedCourseData.image);
            updatedCourseData.contents.forEach((content, index) => {
                formData.append(`contents[${index}].text`, content.text);
                formData.append(`contents[${index}].video`, content.video);
            });
        try{
            const response = await axiosInstance.post('/instructor/createCourse',formData);
            if(response.status === 200){
                alert("Course Added Succesfully")
            }
        }catch(error){
                alert("Failed to Add Course");
        }
        setCourseData(initialState);
    }

    if(user.userId != ""){

  return (
    <div className='instructor-container'>
        <div className='row d-flex flex-md-row flex-column justify-content-center bg-dark text-white p-3 g-3'>
            <div className='col-lg-5 col-md-10 col-10 m-md-2 my-auto mx-md-2 mx-5 text-md-left text-center'>
                <h3>{user.userName}</h3>
            </div>
            <div className='col-lg-6 col-md-10 d-flex flex-md-row flex-column mt-0'>
                <div className='col-md-4 col-10 d-flex flex-md-column flex-row justify-content-md-center justify-content-between shadow-custom p-2 m-md-2 my-2 mx-md-2 mx-5 text-center'>
                    <h6>Total Courses</h6>
                    <p className='mb-0'>{instructorCourses.length}</p>
                </div>
                <div className='col-md-4 col-10 d-flex flex-md-column flex-row justify-content-md-center justify-content-between shadow-custom p-2 m-md-2 my-2 mx-md-2 mx-5 text-center'>
                    <h6>Total Students</h6>
                    <p className='mb-0'>1800</p>
                </div>
                <div className='col-md-4 col-10 d-flex flex-md-column flex-row justify-content-md-center justify-content-between shadow-custom p-2 m-md-2 my-2 mx-md-2 mx-5 text-center'>
                    <h6>Ratings</h6>
                    <p className='mb-0'>4.1</p>
                </div>
            </div>
        </div>
        <div className='row d-flex justify-content-between m-4'>
            <h2 className='w-auto'>My Courses</h2>
            <button className='btn btn-dark w-auto p-2' onClick={() => setShowModal(true)}>Add Course</button>

        </div>
        <hr className='mx-4' />
        <div className='row d-flex m-4 g-4'>
            {instructorCourses.map((course) => (
                    <div className='col-lg-3 col-md-4 col-sm-6 col-10'>
                        <div className="card mb-4">
                        <img src={`/uploads/images/${course.image}`} alt='Course Image' className='img-fluid' />
                            <div className="card-body">
                                    <h5 className="card-title two-line-heading">{course.title}</h5>
                                    <p className="card-text fw-bold fs-5 mb-2"><LocalOfferIcon className='me-2' />Rs.{course.price}</p>
                                
                                <p className="card-text"><AccessTimeIcon className='me-2' /> {course.duration}</p>
                                <p className="card-text"><LocationOnOutlinedIcon className='me-2' /> mode</p>
                                <p className='card-text'><PeopleOutlinedIcon className='me-2' />345</p>
                                <p className='card-text'><ThumbsUpDownOutlinedIcon className='me-2' />{course.rating}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className='btn btn-danger w-auto' onClick={() => deleteCourse(course.id)}>Delete</button>
                                    <button className='btn btn-dark w-auto' onClick={() => updateCourse(course)}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
            )    
            )}
            
        </div>
        <div className='row m-3'>
            <h2>Reviews</h2>
        </div>
        <hr className='mx-4 my-0' />
        <div className='row d-flex flex-md-row flex-column justify-content-center'>
            {instructorReviews.map((review) => (
                <div className='col-md-5 col-10 m-3 p-4 shadow rounded'>
                <div className='d-flex justify-content-between'>
                    <h5 className='w-auto d-flex align-items-center'>{review.reviewer} | <h6 className='mx-2 mb-0 w-auto'>{review.title}</h6></h5>
                    <p>{review.rating}</p>
                </div>
                <p className=''>{review.comment} </p>
            </div>
            ))}
            
        </div>
        {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Course</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
              <form onSubmit={handleSubmit}>
              
    <div className="row mb-2">
        <div className="col">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
    </div>
    <div className='row mb-2'>
        <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                    type="text"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={courseData.duration}
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={courseData.price}
                    onChange={handleChange}
                />
            </div>
        </div>
    </div>
    <div className='row mb-2'>
        <div className="form-group col-md-6">
            <label htmlFor="mode">Mode</label>
            <select
                className="form-control"
                id="mode"
                name="mode"
                value={courseData.mode}
                onChange={(e) => { handleChange(e); handleModeChange(e); }}
            >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>
        </div>
        {isOffline && (
            <div className="form-group col-md-6">
                <label htmlFor="location">Location</label>
                <select
                    className="form-control"
                    id="location"
                    name="location"
                    value={courseData.location}
                    onChange={handleChange}
                >
                    <option value="A">Location A</option>
                    <option value="B">Location B</option>
                    <option value="C">Location C</option>
                    <option value="D">Location D</option>
                </select>
            </div>
        )}
    </div>
    <div className='row mb-2'>
        <div className="form-group">
            <label htmlFor="contents">Contents</label>
            {courseData.contents.map((content, index) => (
                <div key={index} className="row mb-3">
                    {/* Text Input for Content */}
                    <div className="col-md-7">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Enter content"
                            value={content.text}
                            onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                            required
                        />
                    </div>
                    {/* File Input for Video */}
                    <div className="col-md-4">
                        <input
                            type="file"
                            className="form-control-file mb-2"
                            onChange={(e) => handleVideoUpload(index, e.target.files[0])}
                            accept="video/*"
                            required
                        />
                    </div>
                    {/* Remove Content Button */}
                    <div className="col-md-1">
                        <button type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => removeContentField(index)}>
                           
                        </button>
                    </div>
                </div>
            ))}
            <button type="button" className="btn btn-secondary mb-2 w-auto" onClick={addContentField}>
                Add Content
            </button>
        </div>
    </div>

    <div className="row mb-2">
        <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="demoVideo">Demo Video</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="demoVideo"
                    name="demoVideo"
                    onChange={handleChange}
                    accept="video/*"
                />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="image">Course Image</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                />
            </div>
        </div>
    </div>  

    <div className="form-group mt-3">
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
    </div>
</form>


              </div>
            </div>
          </div>
        </div>
      )}
      
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  )}
  else{
    return <h1 className='display-1 text-center'>Please Login</h1>
  }
}

export default InstructorDashboard