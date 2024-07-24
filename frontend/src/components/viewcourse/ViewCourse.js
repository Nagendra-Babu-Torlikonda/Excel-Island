import React, { useEffect, useState } from 'react';
import './viewcourse.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ViewCourse = () => {
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setCourse] = useState({
        courseId : '',
        title: '',
        demoVideo: '',
        instructorName: '',
        instructorBio: '',
        contents: [],
        reviews: []
    });
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [ratingValue, setRatingValue] = useState(4); // Default value

    const handleRatingChange = (event) => {
        setRatingValue(event.target.value);
    };


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/courses/${id}`);
                if (response.status === 200) {
                    console.log(response.data);
                    setCourse(response.data);
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [id]);

    const enrollCourse = async (id) => {
        try{
            const response = await axios.post('/student/enrollCourse',{userId : user.userId, courseId : course.courseId});
            if(response.status === 200){
                alert("courseEnrolled successfully");
            }
        }catch(error){
            console.log("error");
        }
    };

    const submitReview = (event) => {
        event.preventDefault();
        console.log(event.target.value);
    };

    return (
        <div className="container mt-4">
            <div className='row g-3 d-flex justify-content-around '>
                <div className='col-md-7 m-3'>
                    <div className='row g-3 d-flex flex-column'>
                        <div className='col'>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <p className='display-4 mb-0'>{course.title}</p>
                                {user.userId && 
                                (user.userRole === "ROLE_STUDENT" ? (
                                    <button className='btn btn-dark w-auto px-3' onClick={() => enrollCourse(course.courseId)}>Enroll</button>
                                ) : (
                                    <button className='btn btn-dark w-auto px-3' disabled>Enroll</button>
                                ))}
                            </div>
                            <p>{course.description || 'Description of the course'}</p>
                        </div>
                        <div className="col ratio ratio-16x9 ">
                            <iframe
                                className="w-100 m-2"
                                src={`/uploads/videos/${course.demoVideo}`}
                                title={course.title}
                                allowFullScreen
                                allow="encrypted-media"
                            ></iframe>
                        </div>
                        <div className='col'>
                            <div className='d-flex justify-content-between align-items-center my-3'>
                                <h4>{course.instructorName}</h4>
                                <button className='btn btn-dark w-auto' onClick={() => navigate(`/viewInstructor/${course.instructor}`)}>View Instructor</button>
                            </div>
                            <p>{course.instructorBio}</p>
                        </div>
                        <div className='col'>
                            <div className='d-flex justify-content-between'>
                            <h2>Reviews</h2>
                            {(user.userName && user.userRole === 'ROLE_STUDENT') && (
                                <button className='btn btn-dark w-auto' onClick={() => setShowAddReviewModal(true)}>Add Review</button>
                            )}
                            </div>
                            <hr/>
                            <div className='reviews-list d-flex flex-column p-3'>
                                {!course.reviews ? (
                                    <h4>No reviews available</h4>
                                ) : (
                                    course.reviews.map((review, index) => (
                                        <div key={index} className='review-item border-bottom border-dark'>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <h6>{review.reviewer}</h6>
                                                <p>{review.rating}</p>
                                            </div>
                                            <p>{review.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='contents my-3'>
                        <h3 className='text-center sticky-top bg-light mt-0'>Contents</h3><hr />
                        <ul className="list-group list-group-flush">
                            {course.contents.map((cont, index) => (
                                <li key={index} className="list-group-item">{cont}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='relevant-courses my-3 p-3'>
                        <h3 className='text-center'>Relevant Courses</h3><hr />
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h6>Title of course</h6>
                            <button className='btn btn-dark w-auto'>View</button>
                        </div>
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h6>Title of the course</h6>
                            <button className='btn btn-dark w-auto'>View</button>
                        </div>
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h6>Title</h6>
                            <button className='btn btn-dark w-auto'>View</button>
                        </div>
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h6>Title</h6>
                            <button className='btn btn-dark w-auto'>View</button>
                        </div>
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h6>Title</h6>
                            <button className='btn btn-dark w-auto'>View</button>
                        </div>
                        <div className='d-flex justify-content-between align-items-center my-3'>
                            <h6>Title</h6>
                            <button className='btn btn-dark w-auto'>View</button>
                        </div>
                    </div>
                </div>
            </div>
            {showAddReviewModal && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg modal-md" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Review Course</h5>
                    <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowAddReviewModal(false)}
                    ></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={submitReview} method='post'>
                    <div>
                        <label htmlFor="customRange2" className="form-label">Rating : <span className='fw-bold'>{ratingValue}</span></label>
                        <input
                            type="range"
                            className="form-range"
                            min="1"
                            max="5"
                            id="customRange2"
                            value={ratingValue}
                            onChange={handleRatingChange}
                        />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="comment" className="form-label">
                        Comment
                        </label>
                        <textarea
                        className="form-control"
                        id="comment"
                        name="comment"
                        rows="5"
                        required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-auto">
                        Done
                    </button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        )}
        
        {showAddReviewModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default ViewCourse;
