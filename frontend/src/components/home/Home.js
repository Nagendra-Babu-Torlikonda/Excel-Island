import React from 'react';
import './home.css';
import HeroImg from '../../images/hero.png';
import BgBottomHero from '../../images/bg-bottom-hero.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  return (
    <div className="home bg-dark">
      <h1 className='text-white text-center'>Excel Island</h1>
      <h4 className='text-white text-center'>Your path to Excellence</h4>
      <section className="hero container d-flex align-items-center">
        <div className="row d-flex align-items-center justify-content-between p-0">
          <div className="col-md-6 px-5">
            <h2 className="display-5">Empower Your Teaching and Learning Experience</h2>
            <p>Discover our curated selection of free tools and extensions designed to elevate both 
              online teaching for instructors and learning for students. Whether you're conducting 
              virtual classes, accessing course materials remotely, or collaborating with peers, 
              our platform empowers you with innovative solutions.</p>
            <div className="buttons d-flex justify-content-around">
              <button className="btn btn-light btn-custom">Read More</button>
              <button className="btn btn-light btn-custom" onClick={() => navigate('/contactus')}>Contact Us</button>
            </div>
          </div>
          <div className="col-md-6">
            <img src={HeroImg} alt="hero" className="img-fluid hero_img rounded" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home