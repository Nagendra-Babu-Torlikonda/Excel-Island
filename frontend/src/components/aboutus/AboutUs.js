import React from 'react';
import './aboutus.css';
import Img1 from '../../images/img1.jpg';
import Img2 from '../../images/img2.jpg';
import Img3 from '../../images/img3.jpg';
import Img4 from '../../images/img4.jpg';
import Blogs from '../blogs/Blogs';

const AboutUs = () => {
  return (
    <div className="container h-100">
    <div className="about-section">
      <h1 className='display-3'>About Us</h1>
      <div className='row d-flex justify-content-around my-4'>
        <div className='col-lg-4 col-md-5 col-10 about-box bg-dark'>
          <h1 className='text-center'>Our Mission</h1>
          <p>Our mission is to empower individuals to unlock their full potential
             by providing accessible, high-quality coaching services that foster 
             personal and professional growth.</p>
        </div>
        <div className='col-lg-4 col-md-5 col-10 about-box bg-dark'>
        <h1 className='text-center'>Our Vision</h1>
        <p>Our vision is to create a global community of inspired individuals 
          who are equipped with the skills and confidence to pursue their dreams
           and make meaningful contributions to the world.</p>
        </div>
      </div>
    </div>

    <h2 className="text-center text-dark display-5 my-4">Our Team</h2>
    <div className="row d-flex justify-content-around">
      <div className="col-lg-3 col-md-6 col-12 mb-4">
        <div className="card d-flex flex-md-column flex-row">
        <div className='card-image d-flex justify-content-center align-items-center  col-md-12 col-5  '>
          <img src={Img1} alt="Jane" className="img-fluid card-image-top rounded-circle p-3" />
          </div>
          <div className="card-body text-center">
            <h2>Jane Doe</h2>
            <p className="title">CEO & Founder</p>
            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
            <p>jane@example.com</p>
            <button className="btn btn-dark">Contact</button>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12 mb-4">
        <div className="card d-flex flex-md-column flex-row">
          <div className='card-image d-flex justify-content-center align-items-center  col-md-12 col-5  '>
          <img src={Img2} alt="Mike" className="img-fluid card-image-top rounded-circle p-3" />
          </div>
          <div className="card-body text-center">
            <h2>Mike Ross</h2>
            <p className="title">Art Director</p>
            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
            <p>mike@example.com</p>
            <button className="btn btn-dark">Contact</button>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-12 mb-4">
        <div className="card d-flex flex-md-column flex-row">
          <div className='card-image d-flex justify-content-center align-items-center  col-md-12 col-5  '>
            <img src={Img3} alt="John" className="img-fluid card-image-top rounded-circle p-3" />
            </div>
            <div className="card-body text-center">
              <h2>John Doe</h2>
              <p className="title">Designer</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>john@example.com</p>
              <button className="btn btn-dark">Contact</button>
            </div>
          </div>
      </div>
    </div>
    <Blogs />
  </div>
  );
};

export default AboutUs;
