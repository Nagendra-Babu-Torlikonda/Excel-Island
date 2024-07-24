import React, { useState, useEffect } from 'react';
import './viewinstructor.css';
import I1 from '../../images/img1.jpg';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ViewInstructor = () => {
    const [instructorData, setInstructorData] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInstructorData = async () => {
            try{
                const res = await axios.get(`/instructors/${id}`)
                if(res.status === 200){
                    setInstructorData(res.data);
                }
            }catch(error){
                console.log(error)
            }
        }

        fetchInstructorData();
    }, []);

  return (
    <div className='container'>
        {instructorData ? (<div className='row'>
            <div className='col-lg-7 col-md-6 col-sm-12 m-3 instructor'>
                <div className='row d-flex flex-column'>
                    <div className='col'>
                        <div className='row'>
                            <div className='col-lg-5'>
                                <img src={`/uploads/profiles/${instructorData.profilePic}`} alt='profile' className='w-100 p-3'/>
                            </div>
                            <div className='col-lg-7 text-center my-auto'>
                                <h3 className='display-5'>{instructorData.username}</h3>
                                <h4>{instructorData.designation}</h4>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col'>
                        <p>Bio : {instructorData.bio} </p>
                    </div>
                    <div className='col my-4'>
                        <h2>Reviews</h2><hr/>
                        <div className='reviews-list d-flex flex-column p-3'>
                            {instructorData.reviews && instructorData.reviews.map((review) => (
                                <div className='col-10 m-3 p-4 shadow rounded'>
                                <div className='d-flex justify-content-between'>
                                    <h5 className='w-auto d-flex align-items-center'>{review.reviewer} | <h6 className='mx-2 mb-0 w-auto'>{review.title}</h6></h5>
                                    <p>{review.rating}</p>
                                </div>
                                <p className=''>{review.comment} </p>
                            </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12 m-3'>
                <div className='instructor-courses m-0 mb-3 p-3'>
                    <h2 className=''>Courses</h2>
                    <hr />
                    <div className='row d-flex flex-column'>
                        {instructorData.courses && instructorData.courses.map((course) => (
                        <div className='col mb-3 border-bottom d-flex justify-content-between align-items-center'>
                            <div>
                                <h5>{course.title}</h5>
                            </div>
                            <button className='btn btn-dark h-auto w-auto' onClick={() => navigate(`/viewcourse/${course.courseId}`)}>View</button>
                        </div>))}
                    </div>
                </div>
                <div className='instructor-contact mt-3'>
                    <h2 className='m-3 pt-3'>Contact</h2>
                    <div className='row d-flex flex-column'>
                        <div className='col d-flex mx-5'> 
                            <MailOutlineIcon className='me-3' />
                            <p>Email</p>
                        </div>
                        <div className='col d-flex mx-5'>
                            <InstagramIcon className='me-3' /> 
                            <p>Instragram</p>
                        </div>
                        <div className='col d-flex mx-5'>
                            <LinkedInIcon className='me-3' /> 
                            <p>LinkedIn</p>
                        </div>
                        <div className='col d-flex mx-5'>
                            <YouTubeIcon className='me-3' />
                            <p>YouTube</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>) : (
            <h1>Data Not available</h1>
        )}
        
    </div>
  )
}

export default ViewInstructor;