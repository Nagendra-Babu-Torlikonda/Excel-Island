import React, { useState } from 'react';
import './Sidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const Sidebar = () => {
    const user = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const onLogout = () => {  
        console.log("logging out") 
        dispatch(logout());
        window.location.href = '/';
    }

    //console.log(user);

    return (
        <>
        <button className="menu-btn" onClick={toggleSidebar}>
            <MenuIcon />
        </button>
        <nav className={isSidebarOpen ? "open" : ""}>
            <div className="sidebar">
                <div className="logo">
                    <span className="logo-name">Excel Island</span>
                    <span className="tagline">Your Path to Excellence</span>
                </div>

                <div className="sidebar-content">
                    
                    <ul className="lists">
                        <li className="list">
                            <Link to="/" className="nav-link">
                                <HomeOutlinedIcon className='icon'/>
                                <span className="link"> Home</span>
                            </Link>
                        </li>
                        <li className="list">
                            <Link to="/aboutus" className="nav-link">
                                <InfoOutlinedIcon className='icon'/>
                                <span className="link">About Us</span>
                            </Link>
                        </li>
                        <li className="list">
                            <Link to="/gallery" className="nav-link">
                                <CollectionsOutlinedIcon className='icon'/>
                                <span className="link">Gallery</span>
                            </Link>
                        </li>
                        <li className="list">
                            <Link to="/contactus" className="nav-link">
                                <ContactSupportOutlinedIcon className='icon'/>
                                <span className="link">Contact Us</span>
                            </Link>
                        </li>
                        <li className="list">
                            <Link to="/allcourses" className="nav-link">
                                <MenuBookOutlinedIcon className='icon' />
                                <span className="link">Courses</span>
                            </Link>
                            </li>
                            <li className="list">
                            <Link to="/instructors" className="nav-link">
                                <PeopleOutlineIcon className='icon' />
                                <span className="link">Instructors</span>
                            </Link>
                        </li>
                        {user.userId && (
                            <>
                                {user.userRole === 'ROLE_ADMIN' ? (
                                <li className="list">
                                    <Link to="/admindashboard" className="nav-link">
                                    <DashboardOutlinedIcon className='icon' />
                                    <span className="link">My Dashboard</span>
                                    </Link>
                                </li>
                                ) : user.userRole === 'ROLE_INSTRUCTOR' ? (
                                <li className="list">
                                    <Link to="/instructordashboard" className="nav-link">
                                    <DashboardOutlinedIcon className='icon' />
                                    <span className="link">My Dashboard</span>
                                    </Link>
                                </li>
                                ) : (
                                <li className="list">
                                    <Link to="/studentdashboard" className="nav-link">
                                    <DashboardOutlinedIcon className='icon' />
                                    <span className="link">My Dashboard</span>
                                    </Link>
                                </li>
                                )}
                                
                            </>
                            )}
                    </ul>
                    {user.userId ? (
                        <div className="bottom-content">
                            <li className="list">
                                <Link to="#" className="nav-link" id='logout' onClick={onLogout}>
                                    <LogoutOutlinedIcon className='icon'/>
                                    <span className="link">Logout</span>
                                </Link>
                            </li>
                        </div>
                    ) : (
                        <div className="bottom-content">
                            <li className="list">
                                <Link to="/loginpage" className="nav-link">
                                    <LoginOutlinedIcon className='icon'/>
                                    <span className="link">Login</span>
                                </Link>
                            </li>
                        </div>
                    )}
                </div>
            </div>
        </nav>
        <div className={isSidebarOpen ? "overlay" : ""} onClick={toggleSidebar}></div>
        </>
    );
};

export default Sidebar;
