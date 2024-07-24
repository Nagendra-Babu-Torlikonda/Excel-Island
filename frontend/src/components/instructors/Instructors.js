import React, { useEffect, useState } from 'react';
import './instructors.css';
import I1 from '../../images/img1.jpg';
import I2 from '../../images/img2.jpg';
import I3 from '../../images/img3.jpg';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchinstructors = async () => {
            try{
                const response = await axios.get("/instructors/cardview")
                if(response.status === 200){
                    setInstructors(response.data);
                    console.log(response.data)
                }
            }catch(error){
                console.log(error)
            }
        }

        fetchinstructors();
    },[]);

    const handleSearch = () => {
        const value = $('#searchInstructor').val().toLowerCase();
        $('.inst-item').each(function () {
            const username = $(this).find('.username').text().toLowerCase();
            const role = $(this).find('.role').text().toLowerCase();
            if (username.indexOf(value) > -1 || role.indexOf(value) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    };



  return (
    <div className='container mt-0 mb-5'>
        <section className=" bg-dark text-white h-auto p-3 mb-4">
            <div className="container">
            <h4 className='display-6'>Popular Instructor</h4>
            <div className="row align-items-center">

                <div className="col-lg-6 order-lg-1 order-2">
                    
                <div className="hero-content">
                    <h1 className="display-4">Carry May</h1>
                    <p className="lead">role of the instructor</p>
                    <button className="btn btn-primary btn-lg">View</button>
                </div>
                </div>

                <div className="col-lg-6 order-lg-2 order-1 mb-4 mb-lg-0">
                <img src={I3} alt="Hero Image" className="hero-img" />
                </div>
            </div>
            </div>
        </section>
        <h1 className='display-4 text-center'>Our Instructors</h1>
        <input type='search' placeholder='Search Instructor' onKeyUp={handleSearch} id='searchInstructor' className='form-control w-50 mx-auto bg-light' />
        <div className='row d-flex g-4 mb-5 m-3'>
            {instructors.map((inst) => (
                <div className='col-lg-3 col-md-6 col-sm-12 inst-item'>
                <div className='card'>
                    <img src={`/uploads/profiles/${inst.profilePic}`} alt="" className='card-instructor-image'/>
                    <div className='card-body text-center'>
                        <h5 className='card-title username'>{inst.username}</h5>
                        <p className='card-text m-0 role'>{inst.designation}</p>
                        <p className='card-text m-0 mb-2'>{inst.noOfCourses} courses</p>
                        <div className='instructor-links d-flex justify-content-center my-3'>
                            <a href={inst.contacts.gmail} target='_blank' className='text-dark'><InstagramIcon className='mx-2 fs-2'/></a>
                            <a href={inst.contacts.github} target='_blank' className='text-dark'><GitHubIcon className='mx-2 fs-2'/></a>
                            <a href={inst.contacts.youtube} target='_blank' className='text-dark'><YouTubeIcon className='mx-2 fs-2'/></a>
                            <a href={inst.contacts.linkedin} target='_blank' className='text-dark'><LinkedInIcon className='mx-2 fs-2'/></a>
                        </div>
                        <button className='btn btn-dark w-auto my-2' onClick={() => navigate(`/viewInstructor/${inst.id}`)}>View</button>
                    </div>
                </div>
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default Instructors